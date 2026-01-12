const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const { FilterService } = require('../services');

/**
 * @desc    Search users with advanced filters
 * @route   GET /api/v1/filters/search
 * @access  Private
 */
exports.searchUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, ...filters } = req.query;
  const result = await FilterService.searchUsers(req.user._id, filters, page, limit);

  ApiResponse.paginated(res, 200, 'Search results retrieved', result.users, result.pagination);
});

/**
 * @desc    Get filter options/suggestions
 * @route   GET /api/v1/filters/options
 * @access  Private
 */
exports.getFilterOptions = asyncHandler(async (req, res) => {
  const options = await FilterService.getFilterOptions();

  ApiResponse.success(res, 200, 'Filter options retrieved', { options });
});
