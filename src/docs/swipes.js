/**
 * @swagger
 * /swipes/discover:
 *   get:
 *     summary: Get potential matches for swiping
 *     tags: [Swipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of users to return
 *     responses:
 *       200:
 *         description: Discover users retrieved successfully
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
 *                   example: Discover users retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                     count:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /swipes:
 *   post:
 *     summary: Swipe on a user
 *     tags: [Swipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - swipedUserId
 *               - action
 *             properties:
 *               swipedUserId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               action:
 *                 type: string
 *                 enum: [like, dislike, superlike]
 *                 example: like
 *     responses:
 *       201:
 *         description: Swipe recorded successfully
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
 *                   example: "It's a match!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     swipe:
 *                       type: object
 *                     isMatch:
 *                       type: boolean
 *                       example: true
 *                     match:
 *                       type: object
 *       400:
 *         description: Already swiped on this user
 *       429:
 *         description: Swipe limit reached
 */

/**
 * @swagger
 * /swipes/history:
 *   get:
 *     summary: Get swipe history
 *     tags: [Swipes]
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
 *         name: action
 *         schema:
 *           type: string
 *           enum: [like, dislike, superlike]
 *         description: Filter by action type
 *     responses:
 *       200:
 *         description: Swipe history retrieved successfully
 */

/**
 * @swagger
 * /swipes/likes:
 *   get:
 *     summary: Get users who liked you
 *     tags: [Swipes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users who liked you retrieved successfully
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
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                     count:
 *                       type: integer
 */

/**
 * @swagger
 * /swipes/undo:
 *   post:
 *     summary: Undo last swipe (Premium feature)
 *     tags: [Swipes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Swipe undone successfully
 *       403:
 *         description: Premium feature only
 *       404:
 *         description: No swipe to undo
 */

