const { param, body } = require('express-validator');

exports.matchIdValidator = [
  param('id').isMongoId().withMessage('Invalid match ID'),
];

exports.unmatchValidator = [
  param('id').isMongoId().withMessage('Invalid match ID'),

  body('reason')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Reason cannot exceed 200 characters'),
];

