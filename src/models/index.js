/**
 * Central export for all models
 */

const User = require('./User');
const Swipe = require('./Swipe');
const Match = require('./Match');
const Message = require('./Message');
const Report = require('./Report');
const OTP = require('./OTP');
const AppConfig = require('./AppConfig');

module.exports = {
  User,
  Swipe,
  Match,
  Message,
  Report,
  OTP,
  AppConfig,
};

