/**
 * @swagger
 * /matches:
 *   get:
 *     summary: Get user's matches
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, unmatched, blocked]
 *           default: active
 *         description: Match status filter
 *     responses:
 *       200:
 *         description: Matches retrieved successfully
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
 * /matches/stats:
 *   get:
 *     summary: Get match statistics
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Match statistics retrieved successfully
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
 *                     stats:
 *                       type: object
 *                       properties:
 *                         totalMatches:
 *                           type: integer
 *                           example: 25
 *                         matchesWithConversation:
 *                           type: integer
 *                           example: 15
 *                         matchesWithoutConversation:
 *                           type: integer
 *                           example: 10
 *                         recentMatches:
 *                           type: integer
 *                           example: 5
 */

/**
 * @swagger
 * /matches/{id}:
 *   get:
 *     summary: Get match details
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Match ID
 *     responses:
 *       200:
 *         description: Match details retrieved successfully
 *       404:
 *         description: Match not found
 */

/**
 * @swagger
 * /matches/{id}:
 *   delete:
 *     summary: Unmatch with user
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Match ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 maxLength: 200
 *                 example: Not interested anymore
 *     responses:
 *       200:
 *         description: Unmatched successfully
 *       404:
 *         description: Match not found
 */

