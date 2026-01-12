const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, requireVerified } = require('../middlewares/auth');
const { uploadMultiple } = require('../middlewares/upload');
const validate = require('../middlewares/validation');
const {
  updateProfileValidator,
  updatePreferencesValidator,
  updatePrivacyValidator,
  updateLocationValidator,
  userIdValidator,
  photoIdValidator,
} = require('../validators/userValidator');

// All routes are protected
router.use(protect);

// Profile routes
router.get('/:id', userIdValidator, validate, userController.getUserProfile);
router.put('/profile', updateProfileValidator, validate, userController.updateProfile);
router.put('/preferences', updatePreferencesValidator, validate, userController.updatePreferences);
router.put('/privacy', updatePrivacyValidator, validate, userController.updatePrivacySettings);
router.put('/location', updateLocationValidator, validate, userController.updateLocation);

// Photo routes
router.post('/photos', requireVerified, uploadMultiple, userController.uploadPhotos);
router.delete('/photos/:photoId', photoIdValidator, validate, userController.deletePhoto);
router.put('/photos/:photoId/primary', photoIdValidator, validate, userController.setPrimaryPhoto);

// Block routes
router.post('/block/:userId', userIdValidator, validate, userController.blockUser);
router.delete('/block/:userId', userIdValidator, validate, userController.unblockUser);
router.get('/blocked', userController.getBlockedUsers);

module.exports = router;

