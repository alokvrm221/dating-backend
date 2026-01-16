/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: Send OTP to phone number
 *     description: |
 *       Send a 6-digit OTP to the user's phone number.
 *       
 *       **Note**: OTP is ALWAYS `123456` in current configuration (for easy testing).
 *       
 *       - OTP is sent regardless of whether user exists (prevents phone enumeration)
 *       - OTP is valid for 5 minutes
 *       - In development, OTP is returned in response
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number in international format
 *                 example: "+1234567890"
 *               purpose:
 *                 type: string
 *                 enum: [login, register]
 *                 description: Purpose of OTP (optional, for tracking)
 *                 example: login
 *     responses:
 *       200:
 *         description: OTP sent successfully
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
 *                   example: OTP sent successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     phoneNumber:
 *                       type: string
 *                       example: "+1234567890"
 *                     purpose:
 *                       type: string
 *                       example: login
 *                     expiresIn:
 *                       type: number
 *                       example: 300
 *                       description: Expiration time in seconds
 *                     otp:
 *                       type: string
 *                       example: "123456"
 *                       description: OTP (only in development mode, always 123456)
 *       400:
 *         description: Validation error
 *       429:
 *         description: Too many requests (rate limit exceeded)
 *
 * /auth/verify-otp:
 *   post:
 *     summary: Verify OTP and authenticate (Login or Register)
 *     description: |
 *       Single endpoint that handles both login and registration.
 *       
 *       **For Testing**: Use OTP `123456` (works without calling /send-otp first!)
 *       
 *       **For Existing Users**: Only phoneNumber and otp are required (login)
 *       
 *       **For New Users**: Only phoneNumber and otp are required (creates minimal profile)
 *       - Returns `needsOnboarding: true`
 *       - Complete profile later with `/users/complete-profile`
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - otp
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number
 *                 example: "+1234567890"
 *               otp:
 *                 type: string
 *                 description: 6-digit OTP (use 123456 for testing)
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful (existing user)
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
 *                   example: Login successful! Welcome back!
 *                 data:
 *                   type: object
 *                   properties:
 *                     action:
 *                       type: string
 *                       example: login
 *                     isNewUser:
 *                       type: boolean
 *                       example: false
 *                     user:
 *                       type: object
 *                       description: User profile data
 *                     tokens:
 *                       type: object
 *                       properties:
 *                         accessToken:
 *                           type: string
 *                           description: JWT access token (valid 15 minutes)
 *                         refreshToken:
 *                           type: string
 *                           description: JWT refresh token (valid 7 days)
 *                     redirectTo:
 *                       type: string
 *                       example: /discover
 *       201:
 *         description: Registration successful (new user)
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
 *                   example: Registration successful! Welcome aboard!
 *                 data:
 *                   type: object
 *                   properties:
 *                     action:
 *                       type: string
 *                       example: register
 *                     isNewUser:
 *                       type: boolean
 *                       example: true
 *                     needsOnboarding:
 *                       type: boolean
 *                       example: true
 *                       description: If true, user must complete profile via /users/complete-profile
 *                     user:
 *                       type: object
 *                       description: User profile data (minimal for new users)
 *                     tokens:
 *                       type: object
 *                       properties:
 *                         accessToken:
 *                           type: string
 *                         refreshToken:
 *                           type: string
 *                     redirectTo:
 *                       type: string
 *                       example: /onboarding
 *       400:
 *         description: Validation error or invalid OTP
 *       429:
 *         description: Too many requests
 *
 * /auth/resend-otp:
 *   post:
 *     summary: Resend OTP
 *     description: Resend OTP if previous one expired or wasn't received. Same as /send-otp.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *               purpose:
 *                 type: string
 *                 enum: [login, register]
 *                 example: login
 *     responses:
 *       200:
 *         description: OTP resent successfully
 *       429:
 *         description: Too many requests
 *
 * /auth/check:
 *   post:
 *     summary: Check if user exists by phone number
 *     description: Check if a user exists by phone number. Returns whether user needs to login or register.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number in international format
 *                 example: "+1234567890"
 *     responses:
 *       200:
 *         description: User status retrieved successfully
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
 *                   example: User found. Please verify your phone number.
 *                 data:
 *                   type: object
 *                   properties:
 *                     exists:
 *                       type: boolean
 *                       example: true
 *                     action:
 *                       type: string
 *                       enum: [login, register]
 *                       example: login
 *                     phoneNumber:
 *                       type: string
 *                       example: "+1234567890"
 *                     user:
 *                       type: object
 *                       description: Basic user info (only if exists is true)
 *                       properties:
 *                         _id:
 *                           type: string
 *                         firstName:
 *                           type: string
 *                         lastName:
 *                           type: string
 *                         phoneNumber:
 *                           type: string
 *                         profilePhoto:
 *                           type: string
 *       400:
 *         description: Validation error
 *
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     description: Get a new access token using refresh token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Token refreshed successfully
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
 *                   example: Token refreshed successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     tokens:
 *                       type: object
 *                       properties:
 *                         accessToken:
 *                           type: string
 *                         refreshToken:
 *                           type: string
 *       401:
 *         description: Invalid refresh token
 *
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logout current user and invalidate refresh token
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 *
 * /auth/me:
 *   get:
 *     summary: Get current user profile
 *     description: Get the authenticated user's profile information
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved
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
 *                   example: User profile retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       description: Complete user profile
 *       401:
 *         description: Unauthorized
 *
 * /auth/delete-account:
 *   delete:
 *     summary: Delete user account
 *     description: Permanently delete the user's account
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number for confirmation
 *                 example: "+1234567890"
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       401:
 *         description: Unauthorized or phone number mismatch
 */

module.exports = {};
