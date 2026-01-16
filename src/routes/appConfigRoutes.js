const express = require('express');
const router = express.Router();
const appConfigController = require('../controllers/appConfigController');
const { protect } = require('../middlewares/auth');

// Public routes (for frontend)
router.get('/', appConfigController.getPublicConfigs);
router.get('/:key', appConfigController.getConfigByKey);

// Protected routes (admin only)
router.post('/initialize', protect, appConfigController.initializeDefaults);
router.post('/', protect, appConfigController.upsertConfig);
router.put('/:key', protect, appConfigController.updateConfig);
router.delete('/:key', protect, appConfigController.deleteConfig);
router.get('/all/configs', protect, appConfigController.getAllConfigs);

module.exports = router;

