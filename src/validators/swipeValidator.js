const { body } = require('express-validator');

exports.swipeValidator = [
  body('swipedUserId')
    .notEmpty()
    .withMessage('Swiped user ID is required')
    .isMongoId()
    .withMessage('Invalid user ID'),

  body('action')
    .notEmpty()
    .withMessage('Action is required')
    .isIn(['like', 'dislike', 'superlike'])
    .withMessage('Invalid action. Must be like, dislike, or superlike'),
];

