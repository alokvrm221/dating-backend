const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const AppConfigService = require('../services/AppConfigService');

/**
 * @desc    Get all public configs (for frontend)
 * @route   GET /api/v1/app-config
 * @access  Public
 */
exports.getPublicConfigs = asyncHandler(async (req, res) => {
  const configs = await AppConfigService.getAllConfigs(true);

  ApiResponse.success(res, 200, 'Public configs retrieved', configs);
});

/**
 * @desc    Get all configs (admin only)
 * @route   GET /api/v1/app-config/all
 * @access  Private (Admin)
 */
exports.getAllConfigs = asyncHandler(async (req, res) => {
  const configs = await AppConfigService.getAllConfigs(false);

  ApiResponse.success(res, 200, 'All configs retrieved', configs);
});

/**
 * @desc    Get config by key
 * @route   GET /api/v1/app-config/:key
 * @access  Public (if isPublic) / Private (Admin)
 */
exports.getConfigByKey = asyncHandler(async (req, res) => {
  const { key } = req.params;
  const config = await AppConfigService.getConfigByKey(key);

  // Check if config is public or user is admin
  if (!config.isPublic && (!req.user || req.user.role !== 'admin')) {
    return ApiResponse.error(res, 403, 'Access denied to this config');
  }

  ApiResponse.success(res, 200, 'Config retrieved', {
    key: config.key,
    value: config.value,
    description: config.description,
    category: config.category,
  });
});

/**
 * @desc    Update config value
 * @route   PUT /api/v1/app-config/:key
 * @access  Private (Admin)
 */
exports.updateConfig = asyncHandler(async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  const config = await AppConfigService.updateConfigValue(key, value);

  ApiResponse.success(res, 200, 'Config updated successfully', {
    key: config.key,
    value: config.value,
  });
});

/**
 * @desc    Create or update config (upsert)
 * @route   POST /api/v1/app-config
 * @access  Private (Admin)
 */
exports.upsertConfig = asyncHandler(async (req, res) => {
  const { key, value, description, category, isPublic, isEditable } = req.body;

  const config = await AppConfigService.upsertConfig(key, value, {
    description,
    category,
    isPublic,
    isEditable,
  });

  ApiResponse.success(res, 201, 'Config created/updated successfully', config);
});

/**
 * @desc    Delete config
 * @route   DELETE /api/v1/app-config/:key
 * @access  Private (Admin)
 */
exports.deleteConfig = asyncHandler(async (req, res) => {
  const { key } = req.params;
  const result = await AppConfigService.deleteConfig(key);

  ApiResponse.success(res, 200, result.message);
});

/**
 * @desc    Initialize default configs
 * @route   POST /api/v1/app-config/initialize
 * @access  Private (Admin)
 */
exports.initializeDefaults = asyncHandler(async (req, res) => {
  const result = await AppConfigService.initializeDefaults();

  ApiResponse.success(res, 200, result.message);
});

