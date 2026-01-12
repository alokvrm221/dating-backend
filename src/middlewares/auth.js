const asyncHandler = require('../utils/asyncHandler');
const { AuthenticationError, AuthorizationError } = require('../utils/errorHandler');
const JWTService = require('../utils/jwt');
const { User } = require('../models');
const CacheService = require('../utils/cache');

/**
 * Protect routes - Verify JWT token
 */
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AuthenticationError('Not authorized to access this route');
  }

  try {
    // Verify token
    const decoded = JWTService.verifyAccessToken(token);

    // Check cache first
    const cacheKey = `user:${decoded.id}`;
    let user = await CacheService.get(cacheKey);

    if (!user) {
      // Get user from database
      user = await User.findById(decoded.id).select('-password -refreshToken');

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      // Cache user data for 5 minutes
      await CacheService.set(cacheKey, user, 300);
    }

    // Check if user is active
    if (!user.isActive) {
      throw new AuthorizationError('Your account has been deactivated');
    }

    // Attach user to request
    req.user = user;

    // Update last active timestamp (async, don't wait)
    User.findByIdAndUpdate(user._id, { lastActive: Date.now() }, { new: false }).catch(
      () => {}
    );

    next();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    throw new AuthenticationError('Invalid token');
  }
});

/**
 * Check if user is verified
 */
exports.requireVerified = asyncHandler(async (req, res, next) => {
  if (!req.user.isVerified) {
    throw new AuthorizationError('Please verify your account to access this feature');
  }
  next();
});

/**
 * Check if user is premium
 */
exports.requirePremium = asyncHandler(async (req, res, next) => {
  if (!req.user.isPremium) {
    throw new AuthorizationError('This feature is only available for premium users');
  }

  // Check if premium has expired
  if (req.user.premiumExpiresAt && req.user.premiumExpiresAt < Date.now()) {
    throw new AuthorizationError('Your premium subscription has expired');
  }

  next();
});

/**
 * Optional authentication - doesn't throw error if no token
 */
exports.optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = JWTService.verifyAccessToken(token);
      const user = await User.findById(decoded.id).select('-password -refreshToken');

      if (user && user.isActive) {
        req.user = user;
      }
    } catch (error) {
      // Silently fail for optional auth
    }
  }

  next();
});

