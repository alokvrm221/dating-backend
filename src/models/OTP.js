const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      index: true,
    },
    otp: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: ['login', 'register', 'verification'],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    maxAttempts: {
      type: Number,
      default: 3,
    },
  },
  {
    timestamps: true,
  }
);

// Index for automatic deletion of expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Method to verify OTP
otpSchema.methods.verifyOTP = function (inputOTP) {
  // Check if OTP has expired
  if (new Date() > this.expiresAt) {
    return { success: false, message: 'OTP has expired' };
  }

  // Check if max attempts exceeded
  if (this.attempts >= this.maxAttempts) {
    return { success: false, message: 'Maximum verification attempts exceeded' };
  }

  // Increment attempts
  this.attempts += 1;

  // Verify OTP
  if (this.otp === inputOTP) {
    this.verified = true;
    return { success: true, message: 'OTP verified successfully' };
  }

  return { success: false, message: 'Invalid OTP' };
};

// Static method to generate 6-digit OTP
otpSchema.statics.generateOTP = function () {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Static method to create new OTP
otpSchema.statics.createOTP = async function (phoneNumber, purpose) {
  // Delete any existing OTPs for this phone number and purpose
  await this.deleteMany({ phoneNumber, purpose });

  // Generate new OTP
  const otp = this.generateOTP();

  // Create OTP document with 5 minute expiration
  const otpDoc = await this.create({
    phoneNumber,
    otp,
    purpose,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
  });

  return otpDoc;
};

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;

