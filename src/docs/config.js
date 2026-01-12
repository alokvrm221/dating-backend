/**
 * @swagger
 * tags:
 *   name: Config
 *   description: Static configuration options for frontend dropdowns and selections
 */

/**
 * @swagger
 * /config:
 *   get:
 *     summary: Get all configuration options
 *     description: Returns all static configuration data including hobbies, dating intentions, religions, etc.
 *     tags: [Config]
 *     responses:
 *       200:
 *         description: All configuration options retrieved successfully
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
 *                   example: Configuration options retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     genders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           value:
 *                             type: string
 *                           label:
 *                             type: string
 *                     datingIntentions:
 *                       type: array
 *                     religions:
 *                       type: array
 *                     familyPlans:
 *                       type: array
 *                     educationLevels:
 *                       type: array
 *                     drinkingHabits:
 *                       type: array
 *                     smokingHabits:
 *                       type: array
 *                     politicalViews:
 *                       type: array
 *                     hobbies:
 *                       type: array
 */

/**
 * @swagger
 * /config/keys:
 *   get:
 *     summary: Get all available configuration keys
 *     description: Returns a list of all available configuration keys that can be queried
 *     tags: [Config]
 *     responses:
 *       200:
 *         description: Available keys retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     keys:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["genders", "datingIntentions", "religions", "hobbies"]
 */

/**
 * @swagger
 * /config/onboarding:
 *   get:
 *     summary: Get onboarding options
 *     description: Returns essential options needed during user registration/onboarding
 *     tags: [Config]
 *     responses:
 *       200:
 *         description: Onboarding options retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     genders:
 *                       type: array
 *                     interestedIn:
 *                       type: array
 *                     datingIntentions:
 *                       type: array
 *                     heightRange:
 *                       type: object
 *                     ageRange:
 *                       type: object
 */

/**
 * @swagger
 * /config/profile:
 *   get:
 *     summary: Get profile completion options
 *     description: Returns options for completing user profile (religion, education, etc.)
 *     tags: [Config]
 *     responses:
 *       200:
 *         description: Profile options retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     religions:
 *                       type: array
 *                     familyPlans:
 *                       type: array
 *                     educationLevels:
 *                       type: array
 *                     politicalViews:
 *                       type: array
 *                     zodiacSigns:
 *                       type: array
 *                     languages:
 *                       type: array
 *                     pets:
 *                       type: array
 */

/**
 * @swagger
 * /config/lifestyle:
 *   get:
 *     summary: Get lifestyle options
 *     description: Returns lifestyle-related options (drinking, smoking, workout habits, etc.)
 *     tags: [Config]
 *     responses:
 *       200:
 *         description: Lifestyle options retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     drinkingHabits:
 *                       type: array
 *                     smokingHabits:
 *                       type: array
 *                     marijuanaUsage:
 *                       type: array
 *                     workoutHabits:
 *                       type: array
 *                     dietPreferences:
 *                       type: array
 *                     sleepingHabits:
 *                       type: array
 */

/**
 * @swagger
 * /config/relationship:
 *   get:
 *     summary: Get relationship options
 *     description: Returns relationship-related options (dating intentions, relationship types, etc.)
 *     tags: [Config]
 *     responses:
 *       200:
 *         description: Relationship options retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     datingIntentions:
 *                       type: array
 *                     relationshipTypes:
 *                       type: array
 *                     familyPlans:
 *                       type: array
 *                     loveLanguages:
 *                       type: array
 */

/**
 * @swagger
 * /config/hobbies/categories:
 *   get:
 *     summary: Get hobbies grouped by category
 *     description: Returns all hobbies organized by their categories
 *     tags: [Config]
 *     responses:
 *       200:
 *         description: Hobbies by category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     hobbies:
 *                       type: object
 *                       example:
 *                         Sports & Fitness:
 *                           - { value: "gym", label: "Gym" }
 *                           - { value: "yoga", label: "Yoga" }
 *                         Music & Arts:
 *                           - { value: "music", label: "Music" }
 */

/**
 * @swagger
 * /config/hobbies/search:
 *   get:
 *     summary: Search hobbies
 *     description: Search hobbies by name or category
 *     tags: [Config]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query
 *         example: music
 *     responses:
 *       200:
 *         description: Hobbies search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     hobbies:
 *                       type: array
 *                     count:
 *                       type: integer
 *       400:
 *         description: Search query is required
 */

/**
 * @swagger
 * /config/batch:
 *   post:
 *     summary: Get multiple configurations by keys
 *     description: Fetch multiple configuration options in a single request
 *     tags: [Config]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - keys
 *             properties:
 *               keys:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["genders", "datingIntentions", "religions"]
 *     responses:
 *       200:
 *         description: Configuration options retrieved successfully
 *       400:
 *         description: Please provide an array of configuration keys
 */

/**
 * @swagger
 * /config/{key}:
 *   get:
 *     summary: Get specific configuration by key
 *     description: Returns a specific configuration option by its key
 *     tags: [Config]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Configuration key
 *         example: datingIntentions
 *     responses:
 *       200:
 *         description: Configuration retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       404:
 *         description: Configuration key not found
 */

module.exports = {};
