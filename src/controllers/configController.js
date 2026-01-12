const ConfigService = require('../services/ConfigService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');

/**
 * @desc    Get all configuration options
 * @route   GET /api/v1/config
 * @access  Public
 */
const getAllConfig = asyncHandler(async (req, res) => {
  const config = ConfigService.getAllOptions();

  return successResponse(res, {
    message: 'Configuration options retrieved successfully',
    data: config,
  });
});

/**
 * @desc    Get specific configuration by key
 * @route   GET /api/v1/config/:key
 * @access  Public
 */
const getConfigByKey = asyncHandler(async (req, res) => {
  const { key } = req.params;
  const config = ConfigService.getOptionByKey(key);

  if (!config) {
    return successResponse(res, {
      statusCode: 404,
      message: `Configuration key '${key}' not found`,
      data: null,
    });
  }

  return successResponse(res, {
    message: `Configuration for '${key}' retrieved successfully`,
    data: { [key]: config },
  });
});

/**
 * @desc    Get multiple configurations by keys
 * @route   POST /api/v1/config/batch
 * @access  Public
 */
const getConfigBatch = asyncHandler(async (req, res) => {
  const { keys } = req.body;

  if (!keys || !Array.isArray(keys) || keys.length === 0) {
    return successResponse(res, {
      statusCode: 400,
      message: 'Please provide an array of configuration keys',
      data: null,
    });
  }

  const config = ConfigService.getOptionsByKeys(keys);

  return successResponse(res, {
    message: 'Configuration options retrieved successfully',
    data: config,
  });
});

/**
 * @desc    Get all available configuration keys
 * @route   GET /api/v1/config/keys
 * @access  Public
 */
const getAvailableKeys = asyncHandler(async (req, res) => {
  const keys = ConfigService.getAvailableKeys();

  return successResponse(res, {
    message: 'Available configuration keys retrieved successfully',
    data: { keys },
  });
});

/**
 * @desc    Get hobbies grouped by category
 * @route   GET /api/v1/config/hobbies/categories
 * @access  Public
 */
const getHobbiesByCategory = asyncHandler(async (req, res) => {
  const hobbies = ConfigService.getHobbiesByCategory();

  return successResponse(res, {
    message: 'Hobbies by category retrieved successfully',
    data: { hobbies },
  });
});

/**
 * @desc    Search hobbies
 * @route   GET /api/v1/config/hobbies/search
 * @access  Public
 */
const searchHobbies = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length === 0) {
    return successResponse(res, {
      statusCode: 400,
      message: 'Please provide a search query',
      data: null,
    });
  }

  const hobbies = ConfigService.searchHobbies(q);

  return successResponse(res, {
    message: 'Hobbies search results retrieved successfully',
    data: { hobbies, count: hobbies.length },
  });
});

/**
 * @desc    Get onboarding options (essential fields for registration)
 * @route   GET /api/v1/config/onboarding
 * @access  Public
 */
const getOnboardingOptions = asyncHandler(async (req, res) => {
  const options = ConfigService.getOnboardingOptions();

  return successResponse(res, {
    message: 'Onboarding options retrieved successfully',
    data: options,
  });
});

/**
 * @desc    Get profile completion options
 * @route   GET /api/v1/config/profile
 * @access  Public
 */
const getProfileOptions = asyncHandler(async (req, res) => {
  const options = ConfigService.getProfileOptions();

  return successResponse(res, {
    message: 'Profile options retrieved successfully',
    data: options,
  });
});

/**
 * @desc    Get lifestyle options
 * @route   GET /api/v1/config/lifestyle
 * @access  Public
 */
const getLifestyleOptions = asyncHandler(async (req, res) => {
  const options = ConfigService.getLifestyleOptions();

  return successResponse(res, {
    message: 'Lifestyle options retrieved successfully',
    data: options,
  });
});

/**
 * @desc    Get relationship options
 * @route   GET /api/v1/config/relationship
 * @access  Public
 */
const getRelationshipOptions = asyncHandler(async (req, res) => {
  const options = ConfigService.getRelationshipOptions();

  return successResponse(res, {
    message: 'Relationship options retrieved successfully',
    data: options,
  });
});

module.exports = {
  getAllConfig,
  getConfigByKey,
  getConfigBatch,
  getAvailableKeys,
  getHobbiesByCategory,
  searchHobbies,
  getOnboardingOptions,
  getProfileOptions,
  getLifestyleOptions,
  getRelationshipOptions,
};
