const { body } = require('express-validator');

exports.registerValidator = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),

  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),

  body('dateOfBirth')
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Invalid date format')
    .custom((value) => {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      if (age < 18) {
        throw new Error('You must be at least 18 years old');
      }
      return true;
    }),

  body('gender')
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['male', 'female', 'non-binary', 'other'])
    .withMessage('Invalid gender'),

  body('interestedIn')
    .isArray({ min: 1 })
    .withMessage('Interested in must be an array with at least one value')
    .custom((value) => {
      const validOptions = ['male', 'female', 'non-binary', 'other', 'everyone'];
      return value.every((item) => validOptions.includes(item));
    })
    .withMessage('Invalid interested in value'),

  body('agreedToTerms')
    .notEmpty()
    .withMessage('You must agree to terms and conditions')
    .isBoolean()
    .withMessage('Agreed to terms must be a boolean')
    .custom((value) => value === true)
    .withMessage('You must agree to terms and conditions'),

  body('agreedToPrivacyPolicy')
    .notEmpty()
    .withMessage('You must agree to privacy policy')
    .isBoolean()
    .withMessage('Agreed to privacy policy must be a boolean')
    .custom((value) => value === true)
    .withMessage('You must agree to privacy policy'),
];

exports.loginValidator = [
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').normalizeEmail(),

  body('password').notEmpty().withMessage('Password is required'),
];

exports.refreshTokenValidator = [
  body('refreshToken').notEmpty().withMessage('Refresh token is required'),
];

exports.forgotPasswordValidator = [
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').normalizeEmail(),
];

exports.resetPasswordValidator = [
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
];

exports.changePasswordValidator = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),

  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
];

exports.deleteAccountValidator = [
  body('password').notEmpty().withMessage('Password is required to delete account'),
];

