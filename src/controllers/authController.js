const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const { AuthService } = require('../services');

/**
 * @desc    Register new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
exports.register = asyncHandler(async (req, res) => {
  const result = await AuthService.register(req.body);

  ApiResponse.success(res, 201, 'Registration successful', result);
});

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await AuthService.login(email, password);

  ApiResponse.success(res, 200, 'Login successful', result);
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
 * @desc    Forgot password
 * @route   POST /api/v1/auth/forgot-password
 * @access  Public
 */
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  await AuthService.forgotPassword(email);

  ApiResponse.success(res, 200, 'Password reset email sent');
});

/**
 * @desc    Reset password
 * @route   POST /api/v1/auth/reset-password/:token
 * @access  Public
 */
exports.resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  await AuthService.resetPassword(token, password);

  ApiResponse.success(res, 200, 'Password reset successful');
});

/**
 * @desc    Change password
 * @route   PUT /api/v1/auth/change-password
 * @access  Private
 */
exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await AuthService.changePassword(req.user._id, currentPassword, newPassword);

  ApiResponse.success(res, 200, 'Password changed successfully');
});

/**
 * @desc    Delete account
 * @route   DELETE /api/v1/auth/delete-account
 * @access  Private
 */
exports.deleteAccount = asyncHandler(async (req, res) => {
  const { password } = req.body;
  await AuthService.deleteAccount(req.user._id, password);

  ApiResponse.success(res, 200, 'Account deleted successfully');
});

