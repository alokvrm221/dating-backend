const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('./errorHandler');

/**
 * JWT Utility Functions
 */

class JWTService {
  /**
   * Generate access token
   * @param {Object} payload - Token payload
   * @returns {String} - JWT token
   */
  static generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    });
  }

  /**
   * Generate refresh token
   * @param {Object} payload - Token payload
   * @returns {String} - JWT refresh token
   */
  static generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d',
    });
  }

  /**
   * Verify access token
   * @param {String} token - JWT token
   * @returns {Object} - Decoded token payload
   */
  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new AuthenticationError('Invalid or expired token');
    }
  }

  /**
   * Verify refresh token
   * @param {String} token - JWT refresh token
   * @returns {Object} - Decoded token payload
   */
  static verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      throw new AuthenticationError('Invalid or expired refresh token');
    }
  }

  /**
   * Generate token pair (access + refresh)
   * @param {Object} payload - Token payload
   * @returns {Object} - Object containing access and refresh tokens
   */
  static generateTokenPair(payload) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }
}

module.exports = JWTService;

