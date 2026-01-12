const express = require('express');
const router = express.Router();
const swipeController = require('../controllers/swipeController');
const { protect, requireVerified, requirePremium } = require('../middlewares/auth');
const { swipeLimiter } = require('../middlewares/rateLimiter');
const validate = require('../middlewares/validation');
const { swipeValidator } = require('../validators/swipeValidator');

// All routes are protected and require verification
router.use(protect, requireVerified);

// Swipe routes
router.get('/discover', swipeController.getDiscoverUsers);
router.post('/', swipeLimiter, swipeValidator, validate, swipeController.swipeUser);
router.get('/history', swipeController.getSwipeHistory);
router.get('/likes', swipeController.getUsersWhoLikedMe);
router.post('/undo', requirePremium, swipeController.undoSwipe);

module.exports = router;

