const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const { ContentService } = require('../services');

/**
 * @desc    Get Terms and Conditions
 * @route   GET /api/v1/content/terms
 * @access  Public
 */
exports.getTermsAndConditions = asyncHandler(async (req, res) => {
  const terms = ContentService.getTermsAndConditions();

  ApiResponse.success(res, 200, 'Terms and Conditions retrieved', { terms });
});

/**
 * @desc    Get Privacy Policy
 * @route   GET /api/v1/content/privacy
 * @access  Public
 */
exports.getPrivacyPolicy = asyncHandler(async (req, res) => {
  const privacy = ContentService.getPrivacyPolicy();

  ApiResponse.success(res, 200, 'Privacy Policy retrieved', { privacy });
});

/**
 * @desc    Get Community Guidelines
 * @route   GET /api/v1/content/guidelines
 * @access  Public
 */
exports.getCommunityGuidelines = asyncHandler(async (req, res) => {
  const guidelines = ContentService.getCommunityGuidelines();

  ApiResponse.success(res, 200, 'Community Guidelines retrieved', { guidelines });
});
