const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const { authLimiter } = require('../middlewares/rateLimiter');
const validate = require('../middlewares/validation');
const {
  registerValidator,
  loginValidator,
  refreshTokenValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
  deleteAccountValidator,
} = require('../validators/authValidator');

// Public routes
router.post('/register', authLimiter, registerValidator, validate, authController.register);
router.post('/login', authLimiter, loginValidator, validate, authController.login);
router.post('/refresh-token', refreshTokenValidator, validate, authController.refreshToken);
router.post('/forgot-password', authLimiter, forgotPasswordValidator, validate, authController.forgotPassword);
router.post('/reset-password/:token', authLimiter, resetPasswordValidator, validate, authController.resetPassword);

// Protected routes
router.get('/me', protect, authController.getMe);
router.post('/logout', protect, authController.logout);
router.put('/change-password', protect, changePasswordValidator, validate, authController.changePassword);
router.delete('/delete-account', protect, deleteAccountValidator, validate, authController.deleteAccount);

module.exports = router;

