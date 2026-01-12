const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const { SwipeService } = require('../services');

/**
 * @desc    Get potential matches for user
 * @route   GET /api/v1/swipes/discover
 * @access  Private
 */
exports.getDiscoverUsers = asyncHandler(async (req, res) => {
  const { limit = 20 } = req.query;
  const result = await SwipeService.getDiscoverUsers(req.user._id, limit);

  ApiResponse.success(res, 200, 'Discover users retrieved', result);
});

/**
 * @desc    Swipe on a user
 * @route   POST /api/v1/swipes
 * @access  Private
 */
exports.swipeUser = asyncHandler(async (req, res) => {
  const { swipedUserId, action } = req.body;
  const result = await SwipeService.swipeUser(
    req.user._id,
    swipedUserId,
    action,
    req.user.location
  );

  const message = result.isMatch ? "It's a match!" : 'Swipe recorded';
  ApiResponse.success(res, 201, message, result);
});

/**
 * @desc    Get swipe history
 * @route   GET /api/v1/swipes/history
 * @access  Private
 */
exports.getSwipeHistory = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, action } = req.query;
  const result = await SwipeService.getSwipeHistory(req.user._id, page, limit, action);

  ApiResponse.paginated(
    res,
    200,
    'Swipe history retrieved',
    result.swipes,
    result.pagination
  );
});

/**
 * @desc    Get users who liked me
 * @route   GET /api/v1/swipes/likes
 * @access  Private
 */
exports.getUsersWhoLikedMe = asyncHandler(async (req, res) => {
  const result = await SwipeService.getUsersWhoLikedMe(req.user._id);

  ApiResponse.success(res, 200, 'Users who liked you retrieved', result);
});

/**
 * @desc    Undo last swipe (Premium feature)
 * @route   POST /api/v1/swipes/undo
 * @access  Private (Premium)
 */
exports.undoSwipe = asyncHandler(async (req, res) => {
  await SwipeService.undoSwipe(req.user._id);

  ApiResponse.success(res, 200, 'Swipe undone successfully');
});
