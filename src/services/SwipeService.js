const { User, Swipe, Match } = require('../models');
const { ValidationError, NotFoundError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

/**
 * Swipe Service
 * Handles all swipe-related business logic
 */
class SwipeService {
  /**
   * Get potential matches for user (discovery)
   */
  async getDiscoverUsers(userId, limit = 20) {
    const currentUser = await User.findById(userId);

    // Get users already swiped
    const swipedUsers = await Swipe.find({ swiperId: currentUser._id }).distinct('swipedUserId');

    // Build query filters based on user preferences
    const filters = {
      _id: { $ne: currentUser._id, $nin: [...swipedUsers, ...currentUser.blockedUsers] },
      isActive: true,
      // Removed isVerified filter - users can see all active profiles
    };

    // Gender preference filter
    if (currentUser.preferences.showMe !== 'everyone') {
      filters.gender = currentUser.preferences.showMe;
    }

    // Age preference filter
    const today = new Date();
    const maxBirthDate = new Date(
      today.getFullYear() - currentUser.preferences.ageRange.min,
      today.getMonth(),
      today.getDate()
    );
    const minBirthDate = new Date(
      today.getFullYear() - currentUser.preferences.ageRange.max,
      today.getMonth(),
      today.getDate()
    );

    filters.dateOfBirth = {
      $gte: minBirthDate,
      $lte: maxBirthDate,
    };

    // Check if current user has interested in preference that matches
    filters.interestedIn = { $in: [currentUser.gender, 'everyone'] };

    let users;

    // Location-based search if user has location
    if (currentUser.location && currentUser.location.coordinates) {
      users = await User.find({
        ...filters,
        'location.coordinates': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: currentUser.location.coordinates,
            },
            $maxDistance: currentUser.preferences.maxDistance * 1000, // Convert km to meters
          },
        },
      })
        .limit(parseInt(limit))
        .select('firstName age photos bio occupation interests location');
    } else {
      // Fallback to non-location based search
      users = await User.find(filters)
        .limit(parseInt(limit))
        .select('firstName age photos bio occupation interests location');
    }

    return { users, count: users.length };
  }

  /**
   * Swipe on a user
   */
  async swipeUser(swiperId, swipedUserId, action, location) {
    // Validate action
    if (!['like', 'dislike', 'superlike'].includes(action)) {
      throw new ValidationError('Invalid swipe action');
    }

    // Check if user exists
    const swipedUser = await User.findById(swipedUserId);
    if (!swipedUser || !swipedUser.isActive) {
      throw new NotFoundError('User not found');
    }

    // Check if already swiped
    const existingSwipe = await Swipe.hasUserSwiped(swiperId, swipedUserId);
    if (existingSwipe) {
      throw new ValidationError('You have already swiped on this user');
    }

    // Check if user is swiping themselves
    if (swipedUserId === swiperId.toString()) {
      throw new ValidationError('You cannot swipe on yourself');
    }

    // Create swipe
    const swipe = await Swipe.create({
      swiperId,
      swipedUserId,
      action,
      location,
    });

    // Update user stats
    await User.findByIdAndUpdate(swiperId, { $inc: { 'stats.totalSwipes': 1 } });

    let match = null;
    let isMatch = false;

    // Check for match if action is like or superlike
    if (action === 'like' || action === 'superlike') {
      const hasMatch = await Swipe.checkForMatch(swiperId, swipedUserId);

      if (hasMatch) {
        // Create match
        match = await Match.create({
          users: [swiperId, swipedUserId],
          matchedAt: Date.now(),
        });

        // Update swipe with match info
        swipe.isMatch = true;
        swipe.matchId = match._id;
        await swipe.save();

        // Update reciprocal swipe
        await Swipe.findOneAndUpdate(
          { swiperId: swipedUserId, swipedUserId: swiperId },
          { isMatch: true, matchId: match._id }
        );

        // Update both users' match count
        await User.updateMany(
          { _id: { $in: [swiperId, swipedUserId] } },
          { $inc: { 'stats.totalMatches': 1 } }
        );

        isMatch = true;

        logger.info(`New match created between ${swiperId} and ${swipedUserId}`);
      }
    }

    return { swipe, isMatch, match };
  }

  /**
   * Get swipe history
   */
  async getSwipeHistory(userId, page = 1, limit = 20, action = null) {
    const query = { swiperId: userId };
    if (action) {
      query.action = action;
    }

    const swipes = await Swipe.find(query)
      .sort({ swipedAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('swipedUserId', 'firstName age photos bio');

    const total = await Swipe.countDocuments(query);

    return {
      swipes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
        hasNextPage: parseInt(page) * parseInt(limit) < total,
        hasPrevPage: parseInt(page) > 1,
      },
    };
  }

  /**
   * Get users who liked me
   */
  async getUsersWhoLikedMe(userId) {
    const likes = await Swipe.getUsersWhoLiked(userId);
    const users = likes.map((like) => like.swiperId);
    return { users, count: users.length };
  }

  /**
   * Undo last swipe (Premium feature)
   */
  async undoSwipe(userId) {
    // Get last swipe
    const lastSwipe = await Swipe.findOne({ swiperId: userId }).sort({ swipedAt: -1 }).limit(1);

    if (!lastSwipe) {
      throw new NotFoundError('No swipe to undo');
    }

    // Check if swipe resulted in match
    if (lastSwipe.isMatch) {
      throw new ValidationError('Cannot undo a swipe that resulted in a match');
    }

    // Delete swipe
    await Swipe.findByIdAndDelete(lastSwipe._id);

    // Update user stats
    await User.findByIdAndUpdate(userId, { $inc: { 'stats.totalSwipes': -1 } });

    return true;
  }
}

module.exports = new SwipeService();

