/**
 * @swagger
 * /filters/search:
 *   get:
 *     summary: Search users with advanced filters
 *     tags: [Filters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: minAge
 *         schema:
 *           type: integer
 *           minimum: 18
 *         description: Minimum age
 *       - in: query
 *         name: maxAge
 *         schema:
 *           type: integer
 *           maximum: 100
 *         description: Maximum age
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [male, female, non-binary, other]
 *         description: Gender filter
 *       - in: query
 *         name: maxDistance
 *         schema:
 *           type: integer
 *           maximum: 500
 *         description: Maximum distance in km
 *       - in: query
 *         name: minHeight
 *         schema:
 *           type: integer
 *           minimum: 100
 *         description: Minimum height in cm
 *       - in: query
 *         name: maxHeight
 *         schema:
 *           type: integer
 *           maximum: 250
 *         description: Maximum height in cm
 *       - in: query
 *         name: education
 *         schema:
 *           type: string
 *         description: Education level
 *       - in: query
 *         name: interests
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Interests (can be multiple)
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: City name
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Country name
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */

/**
 * @swagger
 * /filters/options:
 *   get:
 *     summary: Get available filter options
 *     tags: [Filters]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Filter options retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     options:
 *                       type: object
 *                       properties:
 *                         genders:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["male", "female", "non-binary", "other"]
 *                         cities:
 *                           type: array
 *                           items:
 *                             type: string
 *                         countries:
 *                           type: array
 *                           items:
 *                             type: string
 *                         educationLevels:
 *                           type: array
 *                           items:
 *                             type: string
 *                         interests:
 *                           type: array
 *                           items:
 *                             type: string
 *                         ageRange:
 *                           type: object
 *                           properties:
 *                             min:
 *                               type: integer
 *                               example: 18
 *                             max:
 *                               type: integer
 *                               example: 100
 *                         heightRange:
 *                           type: object
 *                           properties:
 *                             min:
 *                               type: integer
 *                               example: 100
 *                             max:
 *                               type: integer
 *                               example: 250
 *                         distanceRange:
 *                           type: object
 *                           properties:
 *                             min:
 *                               type: integer
 *                               example: 1
 *                             max:
 *                               type: integer
 *                               example: 500
 */

