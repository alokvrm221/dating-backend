/**
 * Central export for all services
 */

const AuthService = require('./AuthService');
const UserService = require('./UserService');
const SwipeService = require('./SwipeService');
const MatchService = require('./MatchService');
const FilterService = require('./FilterService');
const ContentService = require('./ContentService');
const ConfigService = require('./ConfigService');

module.exports = {
  AuthService,
  UserService,
  SwipeService,
  MatchService,
  FilterService,
  ContentService,
  ConfigService,
};

