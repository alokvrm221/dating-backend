const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// Public routes - no authentication required
router.get('/terms', contentController.getTermsAndConditions);
router.get('/privacy', contentController.getPrivacyPolicy);
router.get('/guidelines', contentController.getCommunityGuidelines);

module.exports = router;

