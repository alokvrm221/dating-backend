/**
 * Standard API Response Utility
 * Ensures consistent response format across all endpoints
 */

class ApiResponse {
  /**
   * Success response
   * @param {Object} res - Express response object
   * @param {Number} statusCode - HTTP status code
   * @param {String} message - Success message
   * @param {Object} data - Response data
   */
  static success(res, statusCode = 200, message = 'Success', data = null) {
    const response = {
      success: true,
      message,
      data,
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Error response
   * @param {Object} res - Express response object
   * @param {Number} statusCode - HTTP status code
   * @param {String} message - Error message
   * @param {Array} errors - Array of error details
   */
  static error(res, statusCode = 500, message = 'Internal Server Error', errors = null) {
    const response = {
      success: false,
      message,
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Paginated response
   * @param {Object} res - Express response object
   * @param {Number} statusCode - HTTP status code
   * @param {String} message - Success message
   * @param {Array} data - Response data array
   * @param {Object} pagination - Pagination metadata
   */
  static paginated(res, statusCode = 200, message = 'Success', data = [], pagination = {}) {
    const response = {
      success: true,
      message,
      data,
      pagination: {
        page: pagination.page || 1,
        limit: pagination.limit || 20,
        total: pagination.total || 0,
        totalPages: pagination.totalPages || 0,
        hasNextPage: pagination.hasNextPage || false,
        hasPrevPage: pagination.hasPrevPage || false,
      },
    };

    return res.status(statusCode).json(response);
  }
}

module.exports = ApiResponse;

