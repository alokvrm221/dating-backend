const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const { protect, requireVerified } = require('../middlewares/auth');
const validate = require('../middlewares/validation');
const { matchIdValidator, unmatchValidator } = require('../validators/matchValidator');

// All routes are protected and require verification
router.use(protect, requireVerified);

// Match routes
router.get('/', matchController.getMatches);
router.get('/stats', matchController.getMatchStats);
router.get('/:id', matchIdValidator, validate, matchController.getMatch);
router.delete('/:id', unmatchValidator, validate, matchController.unmatch);

module.exports = router;

