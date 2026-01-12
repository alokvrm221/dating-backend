const { User } = require('../models');
const CacheService = require('../utils/cache');
const { cloudinary } = require('../config/cloudinary');
const { NotFoundError, ValidationError } = require('../utils/errorHandler');

/**
 * User Service
 * Handles all user-related business logic
 */
class UserService {
  /**
   * Get user profile by ID
   */
  async getUserProfile(userId, requestingUserId) {
    const user = await User.findById(userId).select('-password -refreshToken');

    if (!user || !user.isActive) {
      throw new NotFoundError('User not found');
    }

    // Increment profile views (async, don't wait)
    User.findByIdAndUpdate(userId, { $inc: { 'stats.profileViews': 1 } }).catch(() => {});

    return user;
  }

  /**
   * Update user profile
   */
  async updateProfile(userId, updates) {
    const allowedFields = [
      // Basic Info
      'firstName',
      'lastName',
      'phoneNumber',
      'bio',
      'occupation',
      'education',
      'educationLevel',
      'height',
      'interests',
      'location',
      // Dating & Relationship
      'datingIntention',
      'relationshipType',
      // Religion & Beliefs
      'religion',
      'politicalViews',
      // Family
      'familyPlans',
      // Lifestyle Habits
      'drinkingHabit',
      'smokingHabit',
      'marijuanaUsage',
      'workoutHabit',
      'dietPreference',
      'sleepingHabit',
      // Personal Traits
      'zodiacSign',
      'communicationStyle',
      'loveLanguage',
      // Pets & Languages
      'pets',
      'languages',
      // Social
      'socialMediaUsage',
    ];

    // Filter allowed fields
    const filteredUpdates = {};
    Object.keys(updates).forEach((key) => {
      if (allowedFields.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    const user = await User.findByIdAndUpdate(userId, filteredUpdates, {
      new: true,
      runValidators: true,
    }).select('-password -refreshToken');

    // Clear cache
    await CacheService.del(`user:${userId}`);

    return user;
  }

  /**
   * Update user preferences
   */
  async updatePreferences(userId, preferences) {
    const { ageRange, maxDistance, showMe } = preferences;

    const updates = {};
    if (ageRange) updates['preferences.ageRange'] = ageRange;
    if (maxDistance) updates['preferences.maxDistance'] = maxDistance;
    if (showMe) updates['preferences.showMe'] = showMe;

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select('-password -refreshToken');

    // Clear cache
    await CacheService.del(`user:${userId}`);

    return user;
  }

  /**
   * Update privacy settings
   */
  async updatePrivacySettings(userId, settings) {
    const { showAge, showDistance, showOnlineStatus, incognitoMode } = settings;

    const updates = {};
    if (showAge !== undefined) updates['privacySettings.showAge'] = showAge;
    if (showDistance !== undefined) updates['privacySettings.showDistance'] = showDistance;
    if (showOnlineStatus !== undefined)
      updates['privacySettings.showOnlineStatus'] = showOnlineStatus;
    if (incognitoMode !== undefined) updates['privacySettings.incognitoMode'] = incognitoMode;

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select('-password -refreshToken');

    // Clear cache
    await CacheService.del(`user:${userId}`);

    return user;
  }

  /**
   * Upload user photos
   */
  async uploadPhotos(userId, files) {
    if (!files || files.length === 0) {
      throw new ValidationError('Please upload at least one photo');
    }

    const user = await User.findById(userId);

    // Check photo limit (max 6 photos)
    if (user.photos.length + files.length > 6) {
      throw new ValidationError('Maximum 6 photos allowed');
    }

    // Upload photos to Cloudinary
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `dating-app/users/${user._id}`,
            transformation: [{ width: 800, height: 800, crop: 'fill', quality: 'auto' }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(file.buffer);
      });
    });

    const uploadResults = await Promise.all(uploadPromises);

    // Add photos to user
    const newPhotos = uploadResults.map((result, index) => ({
      url: result.secure_url,
      publicId: result.public_id,
      isPrimary: user.photos.length === 0 && index === 0, // First photo is primary
    }));

    user.photos.push(...newPhotos);
    await user.save();

    // Clear cache
    await CacheService.del(`user:${userId}`);

    return user.photos;
  }

  /**
   * Delete user photo
   */
  async deletePhoto(userId, photoId) {
    const user = await User.findById(userId);

    const photo = user.photos.id(photoId);
    if (!photo) {
      throw new NotFoundError('Photo not found');
    }

    // Delete from Cloudinary
    if (photo.publicId) {
      await cloudinary.uploader.destroy(photo.publicId);
    }

    // Remove photo from user
    user.photos.pull(photoId);

    // If deleted photo was primary, set first photo as primary
    if (photo.isPrimary && user.photos.length > 0) {
      user.photos[0].isPrimary = true;
    }

    await user.save();

    // Clear cache
    await CacheService.del(`user:${userId}`);

    return true;
  }

  /**
   * Set primary photo
   */
  async setPrimaryPhoto(userId, photoId) {
    const user = await User.findById(userId);

    const photo = user.photos.id(photoId);
    if (!photo) {
      throw new NotFoundError('Photo not found');
    }

    // Remove primary from all photos
    user.photos.forEach((p) => {
      p.isPrimary = false;
    });

    // Set new primary
    photo.isPrimary = true;
    await user.save();

    // Clear cache
    await CacheService.del(`user:${userId}`);

    return user.photos;
  }

  /**
   * Update user location
   */
  async updateLocation(userId, locationData) {
    const { longitude, latitude, city, country } = locationData;

    if (!longitude || !latitude) {
      throw new ValidationError('Longitude and latitude are required');
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
          city,
          country,
        },
        lastLocation: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      },
      { new: true }
    ).select('-password -refreshToken');

    // Clear cache
    await CacheService.del(`user:${userId}`);

    return user.location;
  }

  /**
   * Block user
   */
  async blockUser(userId, userIdToBlock) {
    if (userIdToBlock === userId.toString()) {
      throw new ValidationError('You cannot block yourself');
    }

    const user = await User.findById(userId);

    // Check if already blocked
    if (user.blockedUsers.includes(userIdToBlock)) {
      throw new ValidationError('User is already blocked');
    }

    user.blockedUsers.push(userIdToBlock);
    await user.save();

    return true;
  }

  /**
   * Unblock user
   */
  async unblockUser(userId, userIdToUnblock) {
    const user = await User.findById(userId);

    user.blockedUsers = user.blockedUsers.filter((id) => id.toString() !== userIdToUnblock);
    await user.save();

    return true;
  }

  /**
   * Get blocked users
   */
  async getBlockedUsers(userId) {
    const user = await User.findById(userId).populate(
      'blockedUsers',
      'firstName lastName photos'
    );

    return user.blockedUsers;
  }
}

module.exports = new UserService();

