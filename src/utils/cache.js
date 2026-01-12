const { getRedisClient } = require('../config/redis');
const logger = require('./logger');

/**
 * Cache utility for Redis operations
 */

class CacheService {
  /**
   * Get value from cache
   * @param {String} key - Cache key
   * @returns {Promise<any>} - Cached value or null
   */
  static async get(key) {
    try {
      const client = getRedisClient();
      if (!client) return null;

      const data = await client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error(`Cache get error: ${error.message}`);
      return null;
    }
  }

  /**
   * Set value in cache
   * @param {String} key - Cache key
   * @param {any} value - Value to cache
   * @param {Number} ttl - Time to live in seconds (default: 1 hour)
   */
  static async set(key, value, ttl = 3600) {
    try {
      const client = getRedisClient();
      if (!client) return false;

      await client.setEx(key, ttl, JSON.stringify(value));
      return true;
    } catch (error) {
      logger.error(`Cache set error: ${error.message}`);
      return false;
    }
  }

  /**
   * Delete value from cache
   * @param {String} key - Cache key
   */
  static async del(key) {
    try {
      const client = getRedisClient();
      if (!client) return false;

      await client.del(key);
      return true;
    } catch (error) {
      logger.error(`Cache delete error: ${error.message}`);
      return false;
    }
  }

  /**
   * Delete multiple keys matching pattern
   * @param {String} pattern - Key pattern (e.g., 'user:*')
   */
  static async delPattern(pattern) {
    try {
      const client = getRedisClient();
      if (!client) return false;

      const keys = await client.keys(pattern);
      if (keys.length > 0) {
        await client.del(keys);
      }
      return true;
    } catch (error) {
      logger.error(`Cache delete pattern error: ${error.message}`);
      return false;
    }
  }

  /**
   * Clear all cache
   */
  static async clear() {
    try {
      const client = getRedisClient();
      if (!client) return false;

      await client.flushAll();
      return true;
    } catch (error) {
      logger.error(`Cache clear error: ${error.message}`);
      return false;
    }
  }
}

module.exports = CacheService;

