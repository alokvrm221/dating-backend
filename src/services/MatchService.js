const { Match, User } = require('../models');
const { NotFoundError, ValidationError } = require('../utils/errorHandler');

/**
 * Match Service
 * Handles all match-related business logic
 */
class MatchService {
  /**
   * Get user's matches
   */
  async getMatches(userId, page = 1, limit = 20, status = 'active') {
    const query = {
      users: userId,
      status,
    };

    const matches = await Match.find(query)
      .sort({ lastMessageAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate({
        path: 'users',
        match: { _id: { $ne: userId } },
        select: 'firstName age photos bio location lastActive',
      });

    // Filter out matches where the other user was not populated (deleted/blocked)
    const validMatches = matches.filter((match) => match.users.length > 0);

    const total = await Match.countDocuments(query);

    return {
      matches: validMatches,
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
   * Get single match details
   */
  async getMatch(matchId, userId) {
    const match = await Match.findById(matchId).populate(
      'users',
      'firstName age photos bio occupation interests location lastActive'
    );

    if (!match) {
      throw new NotFoundError('Match not found');
    }

    // Check if user is part of this match
    if (!match.includesUser(userId)) {
      throw new ValidationError('You are not part of this match');
    }

    return match;
  }

  /**
   * Unmatch with user
   */
  async unmatch(matchId, userId, reason = null) {
    const match = await Match.findById(matchId);

    if (!match) {
      throw new NotFoundError('Match not found');
    }

    // Check if user is part of this match
    if (!match.includesUser(userId)) {
      throw new ValidationError('You are not part of this match');
    }

    // Check if already unmatched
    if (match.status !== 'active') {
      throw new ValidationError('Match is already inactive');
    }

    // Unmatch
    match.status = 'unmatched';
    match.unmatchedBy = userId;
    match.unmatchedAt = Date.now();
    match.unmatchReason = reason;
    await match.save();

    // Update both users' match count
    await User.updateMany({ _id: { $in: match.users } }, { $inc: { 'stats.totalMatches': -1 } });

    return true;
  }

  /**
   * Get match statistics
   */
  async getMatchStats(userId) {
    // Total matches
    const totalMatches = await Match.countDocuments({
      users: userId,
      status: 'active',
    });

    // Matches with conversation
    const matchesWithConversation = await Match.countDocuments({
      users: userId,
      status: 'active',
      hasConversation: true,
    });

    // Recent matches (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentMatches = await Match.countDocuments({
      users: userId,
      status: 'active',
      matchedAt: { $gte: sevenDaysAgo },
    });

    return {
      totalMatches,
      matchesWithConversation,
      matchesWithoutConversation: totalMatches - matchesWithConversation,
      recentMatches,
    };
  }
}

module.exports = new MatchService();

