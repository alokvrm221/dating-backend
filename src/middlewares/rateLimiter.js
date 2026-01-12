const rateLimit = require('express-rate-limit');
const logger = require('../utils/logger');

/**
 * General API rate limiter
 */
const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Too many requests, please try again later',
    });
  },
});

/**
 * Strict rate limiter for authentication endpoints
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  skipSuccessfulRequests: true,
  message: 'Too many authentication attempts, please try again later',
  handler: (req, res) => {
    logger.warn(`Auth rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Too many authentication attempts, please try again in 15 minutes',
    });
  },
});

/**
 * Swipe rate limiter
 */
const swipeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // 100 swipes per hour for free users
  skipFailedRequests: true,
  keyGenerator: (req) => {
    return req.user?._id?.toString() || req.ip;
  },
  skip: (req) => {
    // Premium users get unlimited swipes
    return req.user?.isPremium === true;
  },
  handler: (req, res) => {
    logger.info(`Swipe limit reached for user: ${req.user?._id}`);
    res.status(429).json({
      success: false,
      message: 'Swipe limit reached. Upgrade to premium for unlimited swipes!',
    });
  },
});

/**
 * Message rate limiter
 */
const messageLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 20 messages per minute
  keyGenerator: (req) => {
    return req.user?._id?.toString() || req.ip;
  },
  handler: (req, res) => {
    logger.warn(`Message rate limit exceeded for user: ${req.user?._id}`);
    res.status(429).json({
      success: false,
      message: 'Sending messages too quickly, please slow down',
    });
  },
});

module.exports = {
  apiLimiter,
  authLimiter,
  swipeLimiter,
  messageLimiter,
};

