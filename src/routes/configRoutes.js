const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/configController');

/**
 * @swagger
 * tags:
 *   name: Config
 *   description: Static configuration options for frontend
 */

// Get all available keys (must be before /:key route)
router.get('/keys', getAvailableKeys);

// Grouped options endpoints
router.get('/onboarding', getOnboardingOptions);
router.get('/profile', getProfileOptions);
router.get('/lifestyle', getLifestyleOptions);
router.get('/relationship', getRelationshipOptions);

// Hobbies specific endpoints
router.get('/hobbies/categories', getHobbiesByCategory);
router.get('/hobbies/search', searchHobbies);

// Batch get configurations
router.post('/batch', getConfigBatch);

// Get all configurations
router.get('/', getAllConfig);

// Get specific configuration by key (must be last due to :key param)
router.get('/:key', getConfigByKey);

module.exports = router;
