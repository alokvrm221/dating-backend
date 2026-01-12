const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const { UserService } = require('../services');

/**
 * @desc    Get user profile
 * @route   GET /api/v1/users/:id
 * @access  Private
 */
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await UserService.getUserProfile(req.params.id, req.user._id);

  ApiResponse.success(res, 200, 'User profile retrieved', { user });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/v1/users/profile
 * @access  Private
 */
exports.updateProfile = asyncHandler(async (req, res) => {
  const user = await UserService.updateProfile(req.user._id, req.body);

  ApiResponse.success(res, 200, 'Profile updated successfully', { user });
});

/**
 * @desc    Update user preferences
 * @route   PUT /api/v1/users/preferences
 * @access  Private
 */
exports.updatePreferences = asyncHandler(async (req, res) => {
  const user = await UserService.updatePreferences(req.user._id, req.body);

  ApiResponse.success(res, 200, 'Preferences updated successfully', { user });
});

/**
 * @desc    Update privacy settings
 * @route   PUT /api/v1/users/privacy
 * @access  Private
 */
exports.updatePrivacySettings = asyncHandler(async (req, res) => {
  const user = await UserService.updatePrivacySettings(req.user._id, req.body);

  ApiResponse.success(res, 200, 'Privacy settings updated successfully', { user });
});

/**
 * @desc    Upload user photos
 * @route   POST /api/v1/users/photos
 * @access  Private
 */
exports.uploadPhotos = asyncHandler(async (req, res) => {
  const photos = await UserService.uploadPhotos(req.user._id, req.files);

  ApiResponse.success(res, 200, 'Photos uploaded successfully', { photos });
});

/**
 * @desc    Delete user photo
 * @route   DELETE /api/v1/users/photos/:photoId
 * @access  Private
 */
exports.deletePhoto = asyncHandler(async (req, res) => {
  await UserService.deletePhoto(req.user._id, req.params.photoId);

  ApiResponse.success(res, 200, 'Photo deleted successfully');
});

/**
 * @desc    Set primary photo
 * @route   PUT /api/v1/users/photos/:photoId/primary
 * @access  Private
 */
exports.setPrimaryPhoto = asyncHandler(async (req, res) => {
  const photos = await UserService.setPrimaryPhoto(req.user._id, req.params.photoId);

  ApiResponse.success(res, 200, 'Primary photo updated successfully', { photos });
});

/**
 * @desc    Update location
 * @route   PUT /api/v1/users/location
 * @access  Private
 */
exports.updateLocation = asyncHandler(async (req, res) => {
  const location = await UserService.updateLocation(req.user._id, req.body);

  ApiResponse.success(res, 200, 'Location updated successfully', { location });
});

/**
 * @desc    Block user
 * @route   POST /api/v1/users/block/:userId
 * @access  Private
 */
exports.blockUser = asyncHandler(async (req, res) => {
  await UserService.blockUser(req.user._id, req.params.userId);

  ApiResponse.success(res, 200, 'User blocked successfully');
});

/**
 * @desc    Unblock user
 * @route   DELETE /api/v1/users/block/:userId
 * @access  Private
 */
exports.unblockUser = asyncHandler(async (req, res) => {
  await UserService.unblockUser(req.user._id, req.params.userId);

  ApiResponse.success(res, 200, 'User unblocked successfully');
});

/**
 * @desc    Get blocked users
 * @route   GET /api/v1/users/blocked
 * @access  Private
 */
exports.getBlockedUsers = asyncHandler(async (req, res) => {
  const blockedUsers = await UserService.getBlockedUsers(req.user._id);

  ApiResponse.success(res, 200, 'Blocked users retrieved', { blockedUsers });
});

