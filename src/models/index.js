/**
 * Central export for all models
 */

const User = require('./User');
const Swipe = require('./Swipe');
const Match = require('./Match');
const Message = require('./Message');
const Report = require('./Report');

module.exports = {
  User,
  Swipe,
  Match,
  Message,
  Report,
};

