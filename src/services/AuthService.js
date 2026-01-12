const { User } = require('../models');
const JWTService = require('../utils/jwt');
const CacheService = require('../utils/cache');
const EmailService = require('../utils/email');
const {
  ValidationError,
  AuthenticationError,
  ConflictError,
  NotFoundError,
} = require('../utils/errorHandler');
const crypto = require('crypto');

/**
 * Authentication Service
 * Handles all authentication-related business logic
 */
class AuthService {
  /**
   * Register a new user
   */
  async register(userData) {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      gender,
      interestedIn,
      agreedToTerms,
      agreedToPrivacyPolicy,
    } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    // Validate age (must be 18+)
    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    if (age < 18) {
      throw new ValidationError('You must be at least 18 years old to register');
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      phoneNumber,
      dateOfBirth,
      gender,
      interestedIn,
      agreedToTerms,
      agreedToPrivacyPolicy,
      termsAgreedAt: agreedToTerms ? Date.now() : null,
    });

    // Generate tokens
    const tokens = JWTService.generateTokenPair({ id: user._id });

    // Save refresh token
    user.refreshToken = tokens.refreshToken;
    await user.save({ validateBeforeSave: false });

    // Send welcome email (async, don't wait)
    EmailService.sendWelcomeEmail(user).catch(() => {});

    // Remove sensitive data
    user.password = undefined;
    user.refreshToken = undefined;

    return { user, tokens };
  }

  /**
   * Login user
   */
  async login(email, password) {
    // Validate input
    if (!email || !password) {
      throw new ValidationError('Please provide email and password');
    }

    // Find user with password
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Check if account is active
    if (!user.isActive) {
      throw new AuthenticationError('Your account has been deactivated');
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Generate tokens
    const tokens = JWTService.generateTokenPair({ id: user._id });

    // Save refresh token
    user.refreshToken = tokens.refreshToken;
    user.lastActive = Date.now();
    await user.save({ validateBeforeSave: false });

    // Cache user data
    await CacheService.set(`user:${user._id}`, user, 300);

    // Remove sensitive data
    user.password = undefined;
    user.refreshToken = undefined;

    return { user, tokens };
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw new ValidationError('Refresh token is required');
    }

    // Verify refresh token
    const decoded = JWTService.verifyRefreshToken(refreshToken);

    // Find user
    const user = await User.findById(decoded.id).select('+refreshToken');

    if (!user || user.refreshToken !== refreshToken) {
      throw new AuthenticationError('Invalid refresh token');
    }

    // Generate new tokens
    const tokens = JWTService.generateTokenPair({ id: user._id });

    // Update refresh token
    user.refreshToken = tokens.refreshToken;
    await user.save({ validateBeforeSave: false });

    return tokens;
  }

  /**
   * Logout user
   */
  async logout(userId) {
    // Clear refresh token
    await User.findByIdAndUpdate(userId, { refreshToken: null });

    // Clear cache
    await CacheService.del(`user:${userId}`);

    return true;
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(userId) {
    const user = await User.findById(userId);
    return user;
  }

  /**
   * Forgot password - send reset email
   */
  async forgotPassword(email) {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new NotFoundError('No user found with that email');
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour

    await user.save({ validateBeforeSave: false });

    // Send reset email
    try {
      await EmailService.sendPasswordResetEmail(user, resetToken);
      return true;
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw new Error('Error sending email. Please try again later.');
    }
  }

  /**
   * Reset password using token
   */
  async resetPassword(token, newPassword) {
    // Hash token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with valid token
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new ValidationError('Invalid or expired reset token');
    }

    // Set new password
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return true;
  }

  /**
   * Change password
   */
  async changePassword(userId, currentPassword, newPassword) {
    // Get user with password
    const user = await User.findById(userId).select('+password');

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      throw new AuthenticationError('Current password is incorrect');
    }

    // Set new password
    user.password = newPassword;
    await user.save();

    return true;
  }

  /**
   * Delete account
   */
  async deleteAccount(userId, password) {
    // Get user with password
    const user = await User.findById(userId).select('+password');

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Password is incorrect');
    }

    // Soft delete - deactivate account
    user.isActive = false;
    user.email = `deleted_${Date.now()}_${user.email}`;
    await user.save({ validateBeforeSave: false });

    // Clear cache
    await CacheService.del(`user:${user._id}`);

    // Send confirmation email (async)
    EmailService.sendAccountDeletionEmail(user).catch(() => {});

    return true;
  }
}

module.exports = new AuthService();

