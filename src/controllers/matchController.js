const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const { MatchService } = require('../services');

/**
 * @desc    Get user's matches
 * @route   GET /api/v1/matches
 * @access  Private
 */
exports.getMatches = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status = 'active' } = req.query;
  const result = await MatchService.getMatches(req.user._id, page, limit, status);

  ApiResponse.paginated(
    res,
    200,
    'Matches retrieved successfully',
    result.matches,
    result.pagination
  );
});

/**
 * @desc    Get single match details
 * @route   GET /api/v1/matches/:id
 * @access  Private
 */
exports.getMatch = asyncHandler(async (req, res) => {
  const match = await MatchService.getMatch(req.params.id, req.user._id);

  ApiResponse.success(res, 200, 'Match details retrieved', { match });
});

/**
 * @desc    Unmatch with user
 * @route   DELETE /api/v1/matches/:id
 * @access  Private
 */
exports.unmatch = asyncHandler(async (req, res) => {
  const { reason } = req.body;
  await MatchService.unmatch(req.params.id, req.user._id, reason);

  ApiResponse.success(res, 200, 'Unmatched successfully');
});

/**
 * @desc    Get match statistics
 * @route   GET /api/v1/matches/stats
 * @access  Private
 */
exports.getMatchStats = asyncHandler(async (req, res) => {
  const stats = await MatchService.getMatchStats(req.user._id);

  ApiResponse.success(res, 200, 'Match statistics retrieved', { stats });
});
