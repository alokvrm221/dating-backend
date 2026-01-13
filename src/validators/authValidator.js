const { body } = require('express-validator');

exports.sendOTPValidator = [
  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Please provide a valid phone number'),

  body('purpose')
    .optional()
    .isIn(['login', 'register'])
    .withMessage('Purpose must be either login or register'),
];

exports.verifyOTPValidator = [
  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Please provide a valid phone number'),

  body('otp')
    .trim()
    .notEmpty()
    .withMessage('OTP is required')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits')
    .isNumeric()
    .withMessage('OTP must contain only numbers'),

  // Optional registration fields - only validated if provided
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

  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),

  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format')
    .custom((value) => {
      if (value) {
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        if (age < 18) {
          throw new Error('You must be at least 18 years old');
        }
      }
      return true;
    }),

  body('gender')
    .optional()
    .isIn(['male', 'female', 'non-binary', 'other'])
    .withMessage('Invalid gender'),

  body('interestedIn')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Interested in must be an array with at least one value')
    .custom((value) => {
      if (value) {
        const validOptions = ['male', 'female', 'non-binary', 'other', 'everyone'];
        return value.every((item) => validOptions.includes(item));
      }
      return true;
    })
    .withMessage('Invalid interested in value'),

  body('agreedToTerms')
    .optional()
    .isBoolean()
    .withMessage('Agreed to terms must be a boolean'),

  body('agreedToPrivacyPolicy')
    .optional()
    .isBoolean()
    .withMessage('Agreed to privacy policy must be a boolean'),
];

exports.checkUserStatusValidator = [
  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Please provide a valid phone number'),
];

exports.refreshTokenValidator = [
  body('refreshToken').notEmpty().withMessage('Refresh token is required'),
];

exports.deleteAccountValidator = [
  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required to delete account')
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Please provide a valid phone number'),
];
