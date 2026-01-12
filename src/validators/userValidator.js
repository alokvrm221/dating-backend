const { body, param } = require('express-validator');

exports.updateProfileValidator = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),

  body('lastName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),

  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters'),

  body('occupation')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Occupation cannot exceed 100 characters'),

  body('education')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Education cannot exceed 100 characters'),

  body('height')
    .optional()
    .isInt({ min: 100, max: 250 })
    .withMessage('Height must be between 100 and 250 cm'),

  body('interests')
    .optional()
    .isArray()
    .withMessage('Interests must be an array'),
];

exports.updatePreferencesValidator = [
  body('ageRange.min')
    .optional()
    .isInt({ min: 18, max: 100 })
    .withMessage('Minimum age must be between 18 and 100'),

  body('ageRange.max')
    .optional()
    .isInt({ min: 18, max: 100 })
    .withMessage('Maximum age must be between 18 and 100')
    .custom((value, { req }) => {
      if (req.body.ageRange?.min && value < req.body.ageRange.min) {
        throw new Error('Maximum age must be greater than minimum age');
      }
      return true;
    }),

  body('maxDistance')
    .optional()
    .isInt({ min: 1, max: 500 })
    .withMessage('Maximum distance must be between 1 and 500 km'),

  body('showMe')
    .optional()
    .isIn(['male', 'female', 'non-binary', 'other', 'everyone'])
    .withMessage('Invalid show me preference'),
];

exports.updatePrivacyValidator = [
  body('showAge').optional().isBoolean().withMessage('Show age must be a boolean'),

  body('showDistance').optional().isBoolean().withMessage('Show distance must be a boolean'),

  body('showOnlineStatus')
    .optional()
    .isBoolean()
    .withMessage('Show online status must be a boolean'),

  body('incognitoMode').optional().isBoolean().withMessage('Incognito mode must be a boolean'),
];

exports.updateLocationValidator = [
  body('longitude')
    .notEmpty()
    .withMessage('Longitude is required')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude'),

  body('latitude')
    .notEmpty()
    .withMessage('Latitude is required')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude'),

  body('city').optional().trim(),

  body('country').optional().trim(),
];

exports.userIdValidator = [
  param('userId').isMongoId().withMessage('Invalid user ID'),
];

exports.photoIdValidator = [
  param('photoId').isMongoId().withMessage('Invalid photo ID'),
];

