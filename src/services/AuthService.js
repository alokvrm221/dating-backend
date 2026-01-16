const { User, OTP } = require('../models');
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
 * Authentication Service - OTP Based
 * Handles all authentication-related business logic using OTP
 */
class AuthService {
  /**
   * Send OTP to phone number
   * @param {String} phoneNumber - User's phone number
   * @param {String} purpose - Purpose: 'login' or 'register' (optional, for tracking)
   */
  async sendOTP(phoneNumber, purpose = 'login') {
    if (!phoneNumber) {
      throw new ValidationError('Phone number is required');
    }

    // Normalize phone number
    const normalizedPhone = phoneNumber.trim().replace(/[\s\-\(\)]/g, '');

    // Note: We send OTP regardless of user existence for security reasons
    // This prevents phone number enumeration attacks
    // The actual user check happens during OTP verification

    // Generate and save OTP
    const otpDoc = await OTP.createOTP(normalizedPhone, purpose);

    // TODO: Send OTP via SMS service (Twilio, AWS SNS, etc.)
    // For now, we'll return it in development mode
    console.log(`📱 OTP for ${normalizedPhone}: ${otpDoc.otp}`);

    // In production, don't return the OTP
    const response = {
      phoneNumber: normalizedPhone,
      purpose,
      expiresIn: 300, // 5 minutes in seconds
      message: 'OTP sent successfully',
    };

    // Only include OTP in development
    if (process.env.NODE_ENV === 'development') {
      response.otp = otpDoc.otp; // Remove this in production!
    }

    return response;
  }

  /**
   * Verify OTP and login/register user
   * @param {Object} data - { phoneNumber, otp, ...registrationData }
   */
  async verifyOTP(data) {
    const { phoneNumber, otp, ...registrationData } = data;

    if (!phoneNumber || !otp) {
      throw new ValidationError('Phone number and OTP are required');
    }

    // Normalize phone number
    const normalizedPhone = phoneNumber.trim().replace(/[\s\-\(\)]/g, '');

    // Master OTP - Always valid for testing/development
    const isMasterOTP = otp === '123456';

    if (!isMasterOTP) {
      // Find OTP document for regular OTP verification
      const otpDoc = await OTP.findOne({
        phoneNumber: normalizedPhone,
        verified: false,
      }).sort({ createdAt: -1 });

      if (!otpDoc) {
        throw new ValidationError('No OTP found. Please request a new one.');
      }

      // Verify OTP
      const verificationResult = otpDoc.verifyOTP(otp);
      await otpDoc.save();

      if (!verificationResult.success) {
        throw new ValidationError(verificationResult.message);
      }
    } else {
      console.log('🔓 Master OTP used for phone:', normalizedPhone);
    }

    // Check if user exists
    let user = await User.findOne({ phoneNumber: normalizedPhone });
    let isNewUser = false;
    let needsOnboarding = false;

    if (!user) {
      // New user - check if registration data is provided
      const {
        firstName,
        lastName,
        email,
        dateOfBirth,
        gender,
        interestedIn,
        agreedToTerms,
        agreedToPrivacyPolicy,
      } = registrationData;

      const hasRegistrationData = firstName && lastName && dateOfBirth && gender && interestedIn;

      if (hasRegistrationData) {
        // Full registration - create complete profile
        if (!agreedToTerms || !agreedToPrivacyPolicy) {
          throw new ValidationError('You must agree to terms and privacy policy');
        }

        // Validate age (must be 18+)
        const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
        if (age < 18) {
          throw new ValidationError('You must be at least 18 years old to register');
        }

        // Create user with full profile
        user = await User.create({
          firstName,
          lastName,
          phoneNumber: normalizedPhone,
          email: email ? email.toLowerCase() : undefined,
          dateOfBirth,
          gender,
          interestedIn,
          agreedToTerms,
          agreedToPrivacyPolicy,
          termsAgreedAt: Date.now(),
          phoneVerified: true,
          phoneVerifiedAt: Date.now(),
        });

        isNewUser = true;
        needsOnboarding = false;

        // Send welcome email (async, don't wait) - only if email provided
        if (email) {
          EmailService.sendWelcomeEmail(user).catch(() => {});
        }
      } else {
        // Minimal registration - just verify phone, complete profile later
        // Generate temporary email if not provided (to avoid unique constraint issues)
        const tempEmail = email
          ? email.toLowerCase()
          : `${normalizedPhone.replace(/\D/g, '')}@temp.dating.app`;

        // Create user with minimal data
        const minimalUserData = {
          firstName: 'User', // Temporary
          lastName: normalizedPhone.slice(-4), // Temporary (last 4 digits)
          phoneNumber: normalizedPhone,
          email: tempEmail,
          dateOfBirth: new Date('2000-01-01'), // Temporary
          gender: 'other', // Temporary
          interestedIn: ['everyone'], // Temporary
          agreedToTerms: true, // Assumed for phone verification
          agreedToPrivacyPolicy: true, // Assumed for phone verification
          termsAgreedAt: Date.now(),
          phoneVerified: true,
          phoneVerifiedAt: Date.now(),
        };

        user = await User.create(minimalUserData);

        isNewUser = true;
        needsOnboarding = true;
      }
    } else {
      // Existing user - just update phone verification status
      if (!user.phoneVerified) {
        user.phoneVerified = true;
        user.phoneVerifiedAt = Date.now();
        await user.save({ validateBeforeSave: false });
      }

      // Check if user needs to complete onboarding
      needsOnboarding = user.firstName === 'User' || !user.dateOfBirth || user.gender === 'other';
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
    user.refreshToken = undefined;

    return {
      action: isNewUser ? 'register' : 'login',
      isNewUser,
      needsOnboarding,
      user,
      tokens,
      redirectTo: needsOnboarding ? '/onboarding' : '/discover',
    };
  }

  /**
   * Check user status by phone number
   */
  async checkUserStatus(phoneNumber) {
    if (!phoneNumber) {
      throw new ValidationError('Phone number is required');
    }

    // Normalize phone number
    const normalizedPhone = phoneNumber.trim().replace(/[\s\-\(\)]/g, '');

    // Find user by phone number
    const user = await User.findOne({ phoneNumber: normalizedPhone });

    if (!user) {
      // User doesn't exist - needs registration
      return {
        exists: false,
        action: 'register',
        message: 'User not found. Please complete registration.',
        phoneNumber: normalizedPhone,
      };
    }

    // Check if account is active
    if (!user.isActive) {
      throw new AuthenticationError('Your account has been deactivated');
    }

    // User exists - needs login
    return {
      exists: true,
      action: 'login',
      message: 'User found. Please verify your phone number.',
      phoneNumber: normalizedPhone,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        profilePhoto: user.photos?.[0]?.url || null,
      },
    };
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
   * Delete account
   */
  async deleteAccount(userId, phoneNumber) {
    // Get user
    const user = await User.findById(userId);

    // Verify phone number matches
    if (user.phoneNumber !== phoneNumber) {
      throw new AuthenticationError('Phone number does not match');
    }

    // Soft delete - deactivate account
    user.isActive = false;
    user.phoneNumber = `deleted_${Date.now()}_${user.phoneNumber}`;
    await user.save({ validateBeforeSave: false });

    // Clear cache
    await CacheService.del(`user:${user._id}`);

    // Send confirmation email (async) - only if email exists
    if (user.email) {
      EmailService.sendAccountDeletionEmail(user).catch(() => {});
    }

    return true;
  }

  /**
   * Resend OTP
   */
  async resendOTP(phoneNumber, purpose = 'login') {
    // Same as sendOTP
    return await this.sendOTP(phoneNumber, purpose);
  }
}

module.exports = new AuthService();
