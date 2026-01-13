const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const { authLimiter } = require('../middlewares/rateLimiter');
const validate = require('../middlewares/validation');
const {
  sendOTPValidator,
  verifyOTPValidator,
  checkUserStatusValidator,
  refreshTokenValidator,
  deleteAccountValidator,
} = require('../validators/authValidator');

// Public routes - OTP Based Authentication
router.post('/check', authLimiter, checkUserStatusValidator, validate, authController.checkUserStatus);
router.post('/send-otp', authLimiter, sendOTPValidator, validate, authController.sendOTP);
router.post('/resend-otp', authLimiter, sendOTPValidator, validate, authController.resendOTP);
router.post('/verify-otp', authLimiter, verifyOTPValidator, validate, authController.verifyOTP);
router.post('/refresh-token', refreshTokenValidator, validate, authController.refreshToken);

// Protected routes
router.get('/me', protect, authController.getMe);
router.post('/logout', protect, authController.logout);
router.delete('/delete-account', protect, deleteAccountValidator, validate, authController.deleteAccount);

module.exports = router;
