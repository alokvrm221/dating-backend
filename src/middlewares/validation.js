const { validationResult } = require('express-validator');
const { ValidationError } = require('../utils/errorHandler');

/**
 * Validate request using express-validator
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    throw new ValidationError(errorMessages.join(', '));
  }

  next();
};

module.exports = validate;

