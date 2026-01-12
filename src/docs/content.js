/**
 * @swagger
 * /content/terms:
 *   get:
 *     summary: Get Terms and Conditions
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: Terms and Conditions retrieved successfully
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
 *                     terms:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           example: Terms and Conditions
 *                         lastUpdated:
 *                           type: string
 *                           example: "2026-01-01"
 *                         sections:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               heading:
 *                                 type: string
 *                               content:
 *                                 type: string
 */

/**
 * @swagger
 * /content/privacy:
 *   get:
 *     summary: Get Privacy Policy
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: Privacy Policy retrieved successfully
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
 *                     privacy:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           example: Privacy Policy
 *                         lastUpdated:
 *                           type: string
 *                           example: "2026-01-01"
 *                         sections:
 *                           type: array
 *                           items:
 *                             type: object
 */

/**
 * @swagger
 * /content/guidelines:
 *   get:
 *     summary: Get Community Guidelines
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: Community Guidelines retrieved successfully
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
 *                     guidelines:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           example: Community Guidelines
 *                         lastUpdated:
 *                           type: string
 *                         sections:
 *                           type: array
 *                           items:
 *                             type: object
 */

