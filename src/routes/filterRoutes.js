const express = require('express');
const router = express.Router();
const filterController = require('../controllers/filterController');
const { protect, requireVerified } = require('../middlewares/auth');

// All routes are protected and require verification
router.use(protect, requireVerified);

// Filter routes
router.get('/search', filterController.searchUsers);
router.get('/options', filterController.getFilterOptions);

module.exports = router;

