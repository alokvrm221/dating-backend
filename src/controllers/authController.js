const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const { AuthService } = require('../services');

/**
 * @desc    Send OTP to phone number
 * @route   POST /api/v1/auth/send-otp
 * @access  Public
 */
exports.sendOTP = asyncHandler(async (req, res) => {
  const { phoneNumber, purpose } = req.body;
  const result = await AuthService.sendOTP(phoneNumber, purpose);

  ApiResponse.success(res, 200, result.message, result);
});

/**
 * @desc    Verify OTP and authenticate (login or register)
 * @route   POST /api/v1/auth/verify-otp
 * @access  Public
 */
exports.verifyOTP = asyncHandler(async (req, res) => {
  const result = await AuthService.verifyOTP(req.body);

  const statusCode = result.isNewUser ? 201 : 200;
  const message = result.isNewUser
    ? 'Registration successful! Welcome aboard!'
    : 'Login successful! Welcome back!';

  ApiResponse.success(res, statusCode, message, result);
});

/**
 * @desc    Check user status (exists or needs registration)
 * @route   POST /api/v1/auth/check
 * @access  Public
 */
exports.checkUserStatus = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;
  const result = await AuthService.checkUserStatus(phoneNumber);

  ApiResponse.success(res, 200, result.message, result);
});

/**
 * @desc    Resend OTP
 * @route   POST /api/v1/auth/resend-otp
 * @access  Public
 */
exports.resendOTP = asyncHandler(async (req, res) => {
  const { phoneNumber, purpose } = req.body;
  const result = await AuthService.resendOTP(phoneNumber, purpose);

  ApiResponse.success(res, 200, result.message, result);
});

/**
 * @desc    Refresh access token
 * @route   POST /api/v1/auth/refresh-token
 * @access  Public
 */
exports.refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const tokens = await AuthService.refreshToken(refreshToken);

  ApiResponse.success(res, 200, 'Token refreshed successfully', { tokens });
});

/**
 * @desc    Logout user
 * @route   POST /api/v1/auth/logout
 * @access  Private
 */
exports.logout = asyncHandler(async (req, res) => {
  await AuthService.logout(req.user._id);

  ApiResponse.success(res, 200, 'Logout successful');
});

/**
 * @desc    Get current user profile
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
exports.getMe = asyncHandler(async (req, res) => {
  const user = await AuthService.getCurrentUser(req.user._id);

  ApiResponse.success(res, 200, 'User profile retrieved', { user });
});

/**
 * @desc    Delete account
 * @route   DELETE /api/v1/auth/delete-account
 * @access  Private
 */
exports.deleteAccount = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;
  await AuthService.deleteAccount(req.user._id, phoneNumber);

  ApiResponse.success(res, 200, 'Account deleted successfully');
});
