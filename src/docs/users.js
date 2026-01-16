/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/complete-profile:
 *   post:
 *     summary: Complete user profile (Onboarding)
 *     description: |
 *       Complete user profile after minimal registration.
 *       
 *       Use this endpoint when `needsOnboarding: true` is returned from `/auth/verify-otp`.
 *       
 *       This endpoint updates the temporary profile data with real user information.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - dateOfBirth
 *               - gender
 *               - interestedIn
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "1995-01-01"
 *                 description: Must be 18+
 *               gender:
 *                 type: string
 *                 enum: [male, female, non-binary, other]
 *                 example: male
 *               interestedIn:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [male, female, non-binary, other, everyone]
 *                 example: ["female"]
 *               bio:
 *                 type: string
 *                 maxLength: 500
 *                 example: Love hiking and coffee
 *               occupation:
 *                 type: string
 *                 example: Software Engineer
 *               education:
 *                 type: string
 *                 example: Bachelor's Degree
 *               height:
 *                 type: integer
 *                 minimum: 100
 *                 maximum: 250
 *                 example: 180
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["hiking", "coffee", "travel"]
 *               location:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *     responses:
 *       200:
 *         description: Profile completed successfully
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
 *                   example: Profile completed successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       description: Complete user profile
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *
 * /users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               bio:
 *                 type: string
 *                 maxLength: 500
 *                 example: Love hiking and coffee
 *               occupation:
 *                 type: string
 *                 example: Software Engineer
 *               education:
 *                 type: string
 *                 example: Bachelor's Degree
 *               height:
 *                 type: integer
 *                 minimum: 100
 *                 maximum: 250
 *                 example: 180
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["hiking", "coffee", "travel"]
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /users/preferences:
 *   put:
 *     summary: Update user preferences
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ageRange:
 *                 type: object
 *                 properties:
 *                   min:
 *                     type: integer
 *                     minimum: 18
 *                     example: 25
 *                   max:
 *                     type: integer
 *                     maximum: 100
 *                     example: 35
 *               maxDistance:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 500
 *                 example: 50
 *               showMe:
 *                 type: string
 *                 enum: [male, female, non-binary, other, everyone]
 *                 example: female
 *     responses:
 *       200:
 *         description: Preferences updated successfully
 */

/**
 * @swagger
 * /users/privacy:
 *   put:
 *     summary: Update privacy settings
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               showAge:
 *                 type: boolean
 *                 example: true
 *               showDistance:
 *                 type: boolean
 *                 example: true
 *               showOnlineStatus:
 *                 type: boolean
 *                 example: false
 *               incognitoMode:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Privacy settings updated successfully
 */

/**
 * @swagger
 * /users/location:
 *   put:
 *     summary: Update user location
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - longitude
 *               - latitude
 *             properties:
 *               longitude:
 *                 type: number
 *                 minimum: -180
 *                 maximum: 180
 *                 example: -122.4194
 *               latitude:
 *                 type: number
 *                 minimum: -90
 *                 maximum: 90
 *                 example: 37.7749
 *               city:
 *                 type: string
 *                 example: San Francisco
 *               country:
 *                 type: string
 *                 example: USA
 *     responses:
 *       200:
 *         description: Location updated successfully
 */

/**
 * @swagger
 * /users/photos:
 *   post:
 *     summary: Upload user photos
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 maxItems: 6
 *     responses:
 *       200:
 *         description: Photos uploaded successfully
 *       400:
 *         description: Maximum 6 photos allowed
 */

/**
 * @swagger
 * /users/photos/{photoId}:
 *   delete:
 *     summary: Delete user photo
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: photoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Photo ID
 *     responses:
 *       200:
 *         description: Photo deleted successfully
 *       404:
 *         description: Photo not found
 */

/**
 * @swagger
 * /users/photos/{photoId}/primary:
 *   put:
 *     summary: Set primary photo
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: photoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Photo ID
 *     responses:
 *       200:
 *         description: Primary photo updated successfully
 *       404:
 *         description: Photo not found
 */

/**
 * @swagger
 * /users/block/{userId}:
 *   post:
 *     summary: Block a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to block
 *     responses:
 *       200:
 *         description: User blocked successfully
 *       400:
 *         description: Cannot block yourself
 */

/**
 * @swagger
 * /users/block/{userId}:
 *   delete:
 *     summary: Unblock a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to unblock
 *     responses:
 *       200:
 *         description: User unblocked successfully
 */

/**
 * @swagger
 * /users/blocked:
 *   get:
 *     summary: Get blocked users list
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Blocked users retrieved successfully
 */

