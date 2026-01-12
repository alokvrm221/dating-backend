const { User } = require('../models');

/**
 * Filter Service
 * Handles all filter and search-related business logic
 */
class FilterService {
  /**
   * Search users with advanced filters
   */
  async searchUsers(currentUserId, filters, page = 1, limit = 20) {
    const {
      minAge,
      maxAge,
      gender,
      maxDistance,
      minHeight,
      maxHeight,
      education,
      interests,
      city,
      country,
    } = filters;

    const currentUser = await User.findById(currentUserId);

    // Base filters
    const queryFilters = {
      _id: { $ne: currentUser._id, $nin: currentUser.blockedUsers },
      isActive: true,
      isVerified: true,
    };

    // Age filter
    if (minAge || maxAge) {
      const today = new Date();
      const maxBirthDate = minAge
        ? new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate())
        : new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
      const minBirthDate = maxAge
        ? new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate())
        : new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

      queryFilters.dateOfBirth = {
        $gte: minBirthDate,
        $lte: maxBirthDate,
      };
    }

    // Gender filter
    if (gender) {
      queryFilters.gender = gender;
    }

    // Height filter
    if (minHeight || maxHeight) {
      queryFilters.height = {};
      if (minHeight) queryFilters.height.$gte = parseInt(minHeight);
      if (maxHeight) queryFilters.height.$lte = parseInt(maxHeight);
    }

    // Education filter
    if (education) {
      queryFilters.education = new RegExp(education, 'i');
    }

    // Interests filter
    if (interests) {
      const interestArray = Array.isArray(interests) ? interests : [interests];
      queryFilters.interests = { $in: interestArray };
    }

    // Location filters
    if (city) {
      queryFilters['location.city'] = new RegExp(city, 'i');
    }
    if (country) {
      queryFilters['location.country'] = new RegExp(country, 'i');
    }

    let users;
    let total;

    // Distance-based search if maxDistance is provided and user has location
    if (maxDistance && currentUser.location && currentUser.location.coordinates) {
      users = await User.find({
        ...queryFilters,
        'location.coordinates': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: currentUser.location.coordinates,
            },
            $maxDistance: parseInt(maxDistance) * 1000, // Convert km to meters
          },
        },
      })
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit))
        .select('firstName age photos bio occupation education interests location height');

      total = await User.countDocuments({
        ...queryFilters,
        'location.coordinates': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: currentUser.location.coordinates,
            },
            $maxDistance: parseInt(maxDistance) * 1000,
          },
        },
      });
    } else {
      // Regular search without distance
      users = await User.find(queryFilters)
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit))
        .select('firstName age photos bio occupation education interests location height')
        .sort({ createdAt: -1 });

      total = await User.countDocuments(queryFilters);
    }

    return {
      users,
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
   * Get filter options/suggestions
   */
  async getFilterOptions() {
    // Get unique values for filter dropdowns
    const [cities, countries, educationLevels, allInterests] = await Promise.all([
      User.distinct('location.city', { isActive: true }),
      User.distinct('location.country', { isActive: true }),
      User.distinct('education', { isActive: true }),
      User.distinct('interests', { isActive: true }),
    ]);

    return {
      genders: ['male', 'female', 'non-binary', 'other'],
      cities: cities.filter(Boolean).sort(),
      countries: countries.filter(Boolean).sort(),
      educationLevels: educationLevels.filter(Boolean).sort(),
      interests: allInterests.filter(Boolean).sort(),
      ageRange: { min: 18, max: 100 },
      heightRange: { min: 100, max: 250 }, // in cm
      distanceRange: { min: 1, max: 500 }, // in km
    };
  }
}

module.exports = new FilterService();

