# Dating App - Folder Structure

## Overview

This document explains the scalable folder structure of the dating app backend.

```
dating-app-backend/
│
├── src/                          # Source code directory
│   ├── config/                   # Configuration files
│   │   ├── database.js           # MongoDB connection setup
│   │   ├── redis.js              # Redis connection setup
│   │   └── cloudinary.js         # Cloudinary configuration
│   │
│   ├── controllers/              # HTTP request/response handlers
│   │   ├── authController.js     # Auth route handlers
│   │   ├── userController.js     # User route handlers
│   │   ├── swipeController.js    # Swipe route handlers
│   │   ├── matchController.js    # Match route handlers
│   │   ├── filterController.js   # Filter route handlers
│   │   └── contentController.js  # Content route handlers
│   │
│   ├── services/                 # Business logic layer
│   │   ├── AuthService.js        # Authentication business logic
│   │   ├── UserService.js        # User management business logic
│   │   ├── SwipeService.js       # Swipe functionality logic
│   │   ├── MatchService.js       # Match management logic
│   │   ├── FilterService.js      # Search and filter logic
│   │   ├── ContentService.js     # Static content logic
│   │   └── index.js              # Service exports
│   │
│   ├── middlewares/              # Custom middleware functions
│   │   ├── auth.js               # JWT authentication middleware
│   │   ├── errorMiddleware.js    # Global error handler
│   │   ├── rateLimiter.js        # Rate limiting configurations
│   │   ├── upload.js             # File upload handling (Multer)
│   │   └── validation.js         # Request validation middleware
│   │
│   ├── models/                   # Database models (Mongoose schemas)
│   │   ├── User.js               # User model with profile data
│   │   ├── Swipe.js              # Swipe actions model
│   │   ├── Match.js              # Match model
│   │   ├── Message.js            # Message model (for future chat)
│   │   ├── Report.js             # User report model
│   │   └── index.js              # Model exports
│   │
│   ├── routes/                   # API route definitions
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── userRoutes.js         # User management routes
│   │   ├── swipeRoutes.js        # Swipe routes
│   │   ├── matchRoutes.js        # Match routes
│   │   ├── filterRoutes.js       # Filter and search routes
│   │   ├── contentRoutes.js      # Content routes (terms, privacy)
│   │   └── index.js              # Route aggregation
│   │
│   ├── validators/               # Request validation schemas
│   │   ├── authValidator.js      # Auth request validators
│   │   ├── userValidator.js      # User request validators
│   │   ├── swipeValidator.js     # Swipe request validators
│   │   └── matchValidator.js     # Match request validators
│   │
│   ├── utils/                    # Utility functions and helpers
│   │   ├── logger.js             # Winston logger configuration
│   │   ├── apiResponse.js        # Standardized API responses
│   │   ├── asyncHandler.js       # Async error wrapper
│   │   ├── errorHandler.js       # Custom error classes
│   │   ├── cache.js              # Redis caching utilities
│   │   ├── jwt.js                # JWT token utilities
│   │   └── email.js              # Email service (Nodemailer)
│   │
│   ├── app.js                    # Express app configuration
│   └── server.js                 # Server entry point
│
├── logs/                         # Application logs (auto-generated)
│   ├── error-YYYY-MM-DD.log      # Error logs
│   ├── combined-YYYY-MM-DD.log   # Combined logs
│   └── access-YYYY-MM-DD.log     # HTTP access logs
│
├── .env                          # Environment variables (development)
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── .eslintrc.json                # ESLint configuration
├── package.json                  # NPM dependencies and scripts
├── README.md                     # Project documentation
├── API_DOCUMENTATION.md          # Complete API reference
├── DEPLOYMENT.md                 # Deployment guide
└── FOLDER_STRUCTURE.md           # This file
```

## Directory Explanations

### `/src/config/`
Contains all configuration files for external services:
- **database.js**: MongoDB connection with error handling and reconnection logic
- **redis.js**: Redis connection for caching and session management
- **cloudinary.js**: Image upload service configuration

### `/src/controllers/`
HTTP request/response layer - handles API requests:
- **authController.js**: Handles auth HTTP requests, delegates to AuthService
- **userController.js**: Handles user HTTP requests, delegates to UserService
- **swipeController.js**: Handles swipe HTTP requests, delegates to SwipeService
- **matchController.js**: Handles match HTTP requests, delegates to MatchService
- **filterController.js**: Handles filter HTTP requests, delegates to FilterService
- **contentController.js**: Handles content HTTP requests, delegates to ContentService

### `/src/services/`
Business logic layer - contains all application logic:
- **AuthService.js**: Registration, login, logout, password management
- **UserService.js**: Profile management, photos, location, blocking
- **SwipeService.js**: Discovery algorithm, swiping, match detection
- **MatchService.js**: Match management, statistics
- **FilterService.js**: Advanced search and filtering algorithms
- **ContentService.js**: Terms, privacy policy, guidelines
- **index.js**: Central service exports

### `/src/middlewares/`
Request processing middleware:
- **auth.js**: JWT verification, user authentication, authorization checks
- **errorMiddleware.js**: Global error handling and formatting
- **rateLimiter.js**: API rate limiting configurations
- **upload.js**: File upload handling with Multer
- **validation.js**: Request validation wrapper

### `/src/models/`
Data layer - Mongoose schemas:
- **User.js**: User profile, preferences, privacy settings, statistics
- **Swipe.js**: Swipe actions and match detection
- **Match.js**: Match relationships and status
- **Message.js**: Chat messages (prepared for future feature)
- **Report.js**: User reports and moderation

### `/src/routes/`
API endpoint definitions:
- Maps HTTP methods to controller functions
- Applies middleware (auth, validation, rate limiting)
- Groups related endpoints

### `/src/validators/`
Input validation schemas:
- Uses express-validator
- Validates request body, params, query
- Provides detailed error messages

### `/src/utils/`
Helper functions and utilities:
- **logger.js**: Winston logger with daily rotation
- **apiResponse.js**: Standardized response format
- **asyncHandler.js**: Async/await error wrapper
- **errorHandler.js**: Custom error classes
- **cache.js**: Redis caching helper
- **jwt.js**: JWT token generation and verification
- **email.js**: Email sending service

## Scalability Features

### 1. Separation of Concerns
- Each layer has a specific responsibility
- Easy to modify without affecting other parts
- Clear data flow: Routes → Controllers → Services → Models
- Controllers handle HTTP, Services handle business logic, Models handle data

### 2. Modular Design
- Features are isolated in separate files
- Easy to add new features without cluttering
- Can be split into microservices if needed

### 3. Middleware Pattern
- Reusable authentication and validation
- Easy to add new middleware
- Clean route definitions

### 4. Database Optimization
- Proper indexing in models
- Geospatial queries for location-based matching
- Efficient query patterns

### 5. Caching Strategy
- Redis for frequently accessed data
- Reduces database load
- Improves response times

### 6. Error Handling
- Centralized error handling
- Custom error classes for different scenarios
- Detailed logging for debugging

### 7. Logging
- Winston with daily rotation
- Different log levels
- Separate files for errors, access, and combined logs

### 8. Configuration Management
- Environment-based configuration
- Easy to switch between dev/prod
- Secure credential management

## Adding New Features

### Example: Adding a "Favorites" Feature

1. **Create Model** (`src/models/Favorite.js`)
   ```javascript
   const favoriteSchema = new mongoose.Schema({
     userId: { type: ObjectId, ref: 'User' },
     favoriteUserId: { type: ObjectId, ref: 'User' },
     createdAt: { type: Date, default: Date.now }
   });
   ```

2. **Create Service** (`src/services/FavoriteService.js`)
   ```javascript
   class FavoriteService {
     async addFavorite(userId, favoriteUserId) {
       // Business logic here
       const favorite = await Favorite.create({ userId, favoriteUserId });
       return favorite;
     }
   }
   module.exports = new FavoriteService();
   ```

3. **Create Controller** (`src/controllers/favoriteController.js`)
   ```javascript
   const { FavoriteService } = require('../services');
   
   exports.addFavorite = asyncHandler(async (req, res) => {
     const favorite = await FavoriteService.addFavorite(
       req.user._id,
       req.body.favoriteUserId
     );
     ApiResponse.success(res, 201, 'Favorite added', { favorite });
   });
   ```

4. **Create Validator** (`src/validators/favoriteValidator.js`)
   ```javascript
   exports.addFavoriteValidator = [
     body('favoriteUserId').isMongoId()
   ];
   ```

5. **Create Routes** (`src/routes/favoriteRoutes.js`)
   ```javascript
   router.post('/', protect, addFavoriteValidator, validate, addFavorite);
   ```

6. **Register Routes** (`src/routes/index.js`)
   ```javascript
   router.use('/favorites', favoriteRoutes);
   ```

## Best Practices

1. **Always use async/await** with asyncHandler wrapper
2. **Validate all inputs** using validators
3. **Use proper HTTP status codes** in responses
4. **Log important events** for debugging
5. **Cache frequently accessed data** with Redis
6. **Use transactions** for multi-document operations
7. **Index database fields** used in queries
8. **Rate limit sensitive endpoints** (auth, swipes)
9. **Sanitize user inputs** to prevent injection
10. **Use environment variables** for configuration

## Performance Tips

1. **Database Queries**
   - Use `.lean()` for read-only queries
   - Select only needed fields
   - Use proper indexes
   - Implement pagination

2. **Caching**
   - Cache user profiles
   - Cache discovery results
   - Set appropriate TTL values

3. **File Uploads**
   - Compress images before upload
   - Use CDN for serving images
   - Limit file sizes

4. **API Design**
   - Implement pagination
   - Use query parameters for filtering
   - Return minimal data

## Security Considerations

1. **Authentication**
   - Use strong JWT secrets
   - Implement token refresh
   - Hash passwords with bcrypt

2. **Authorization**
   - Verify user ownership
   - Check permissions
   - Validate resource access

3. **Input Validation**
   - Validate all inputs
   - Sanitize data
   - Use parameterized queries

4. **Rate Limiting**
   - Protect against brute force
   - Limit API calls
   - Different limits per endpoint

## Monitoring

1. **Application Logs**
   - Check error logs daily
   - Monitor access patterns
   - Track performance metrics

2. **Database**
   - Monitor query performance
   - Check index usage
   - Track storage growth

3. **Server**
   - Monitor CPU/memory usage
   - Track response times
   - Set up alerts

## Architecture Pattern

This application follows the **Service Layer Pattern**:

```
Request Flow:
Client → Routes → Middleware → Controller → Service → Model → Database
                                    ↓
                                Response

Layer Responsibilities:
- Routes: Define API endpoints
- Middleware: Validate, authenticate, authorize
- Controllers: Handle HTTP requests/responses
- Services: Contain business logic
- Models: Define data structure and database operations
```

### Benefits of Service Layer:

1. **Separation of Concerns**: HTTP handling separate from business logic
2. **Reusability**: Services can be called from multiple controllers
3. **Testability**: Easy to unit test business logic without HTTP
4. **Maintainability**: Changes to business logic don't affect HTTP layer
5. **Scalability**: Services can be extracted to microservices later

---

This structure is designed to scale from a small startup to a large application with millions of users. Each component can be optimized, replaced, or scaled independently as needed.

