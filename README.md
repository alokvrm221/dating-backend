# Dating App Backend

A scalable, production-ready dating application backend built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication with refresh tokens
  - Secure password hashing with bcrypt
  - Email verification and password reset
  - Account deletion with soft delete

- **User Profile Management**
  - Complete profile with photos, bio, interests
  - Location-based matching
  - Privacy settings and preferences
  - Photo upload with Cloudinary integration

- **Matching System**
  - Smart discovery algorithm based on preferences
  - Swipe functionality (like, dislike, superlike)
  - Real-time match detection
  - Match history and statistics

- **Advanced Filters**
  - Age range filtering
  - Distance-based search
  - Gender preferences
  - Height, education, and interest filters
  - Location-based filtering (city, country)

- **User Safety**
  - Block and report users
  - Content moderation
  - Rate limiting
  - Secure data handling

- **Content Pages**
  - Terms and Conditions
  - Privacy Policy
  - Community Guidelines

## 🏗️ Architecture

### Folder Structure

```
dating-app-backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── database.js   # MongoDB connection
│   │   ├── redis.js      # Redis connection
│   │   └── cloudinary.js # Cloudinary setup
│   ├── controllers/      # HTTP request handlers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── swipeController.js
│   │   ├── matchController.js
│   │   ├── filterController.js
│   │   └── contentController.js
│   ├── services/         # Business logic layer
│   │   ├── AuthService.js
│   │   ├── UserService.js
│   │   ├── SwipeService.js
│   │   ├── MatchService.js
│   │   ├── FilterService.js
│   │   ├── ContentService.js
│   │   └── index.js
│   ├── middlewares/      # Custom middleware
│   │   ├── auth.js       # Authentication middleware
│   │   ├── errorMiddleware.js
│   │   ├── rateLimiter.js
│   │   ├── upload.js     # File upload handling
│   │   └── validation.js
│   ├── models/           # Mongoose models
│   │   ├── User.js
│   │   ├── Swipe.js
│   │   ├── Match.js
│   │   ├── Message.js
│   │   ├── Report.js
│   │   └── index.js
│   ├── routes/           # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── swipeRoutes.js
│   │   ├── matchRoutes.js
│   │   ├── filterRoutes.js
│   │   ├── contentRoutes.js
│   │   └── index.js
│   ├── validators/       # Request validation
│   │   ├── authValidator.js
│   │   ├── userValidator.js
│   │   ├── swipeValidator.js
│   │   └── matchValidator.js
│   ├── utils/            # Utility functions
│   │   ├── logger.js     # Winston logger
│   │   ├── apiResponse.js
│   │   ├── asyncHandler.js
│   │   ├── errorHandler.js
│   │   ├── cache.js      # Redis cache
│   │   ├── jwt.js        # JWT utilities
│   │   └── email.js      # Email service
│   ├── app.js            # Express app setup
│   └── server.js         # Server entry point
├── logs/                 # Application logs
├── .env.example          # Environment variables template
├── .gitignore
├── .eslintrc.json
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Cache**: Redis
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Multer + Cloudinary
- **Validation**: express-validator, Joi
- **Logging**: Winston
- **Security**: Helmet, bcryptjs, express-rate-limit
- **Email**: Nodemailer

## 📦 Installation

### Prerequisites

- Node.js >= 18.0.0
- MongoDB >= 5.0
- Redis (optional, for caching)
- Cloudinary account (for image uploads)

## 📖 API Documentation

This project includes **interactive Swagger/OpenAPI documentation**!

### Access Swagger UI

Once the server is running, visit:

```
http://localhost:5000/api-docs
```

Features:
- 🎯 Browse all 33 API endpoints
- 🧪 Test APIs directly from browser
- 🔐 Built-in authentication support
- 📝 Complete request/response examples
- 📥 Export to Postman/Insomnia

See [SWAGGER_GUIDE.md](./SWAGGER_GUIDE.md) for detailed instructions.

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dating-app-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/dating-app
   JWT_SECRET=your-secret-key
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   # ... other variables
   ```

4. **Start MongoDB**
   ```bash
   # Using MongoDB service
   sudo systemctl start mongodb
   
   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

5. **Start Redis (optional)**
   ```bash
   # Using Redis service
   sudo systemctl start redis
   
   # Or using Docker
   docker run -d -p 6379:6379 --name redis redis:latest
   ```

6. **Run the application**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123",
  "dateOfBirth": "1995-01-01",
  "gender": "male",
  "interestedIn": ["female"],
  "agreedToTerms": true,
  "agreedToPrivacyPolicy": true
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Logout
```http
POST /api/v1/auth/logout
Authorization: Bearer <access_token>
```

#### Delete Account
```http
DELETE /api/v1/auth/delete-account
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "password": "Password123"
}
```

### User Profile Endpoints

#### Get User Profile
```http
GET /api/v1/users/:id
Authorization: Bearer <access_token>
```

#### Update Profile
```http
PUT /api/v1/users/profile
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "bio": "Love hiking and coffee",
  "occupation": "Software Engineer",
  "interests": ["hiking", "coffee", "travel"]
}
```

#### Upload Photos
```http
POST /api/v1/users/photos
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

photos: [file1, file2, ...]
```

#### Update Location
```http
PUT /api/v1/users/location
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "longitude": -122.4194,
  "latitude": 37.7749,
  "city": "San Francisco",
  "country": "USA"
}
```

### Swipe Endpoints

#### Get Discover Users
```http
GET /api/v1/swipes/discover?limit=20
Authorization: Bearer <access_token>
```

#### Swipe on User
```http
POST /api/v1/swipes
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "swipedUserId": "user_id_here",
  "action": "like"
}
```

#### Get Swipe History
```http
GET /api/v1/swipes/history?page=1&limit=20
Authorization: Bearer <access_token>
```

#### Get Users Who Liked Me
```http
GET /api/v1/swipes/likes
Authorization: Bearer <access_token>
```

### Match Endpoints

#### Get Matches
```http
GET /api/v1/matches?page=1&limit=20
Authorization: Bearer <access_token>
```

#### Get Match Details
```http
GET /api/v1/matches/:id
Authorization: Bearer <access_token>
```

#### Unmatch
```http
DELETE /api/v1/matches/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "reason": "Not interested anymore"
}
```

### Filter Endpoints

#### Search Users
```http
GET /api/v1/filters/search?minAge=25&maxAge=35&gender=female&maxDistance=50
Authorization: Bearer <access_token>
```

#### Get Filter Options
```http
GET /api/v1/filters/options
Authorization: Bearer <access_token>
```

### Content Endpoints (Public)

#### Get Terms and Conditions
```http
GET /api/v1/content/terms
```

#### Get Privacy Policy
```http
GET /api/v1/content/privacy
```

#### Get Community Guidelines
```http
GET /api/v1/content/guidelines
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication with refresh tokens
- **Password Hashing**: Bcrypt with salt rounds for secure password storage
- **Rate Limiting**: Prevent abuse with configurable rate limits
- **Helmet**: Security headers for Express
- **CORS**: Configurable cross-origin resource sharing
- **Input Validation**: Comprehensive validation using express-validator
- **XSS Protection**: Input sanitization and output encoding
- **Data Encryption**: Sensitive data encryption at rest

## 📊 Database Schema

### User Model
- Personal information (name, email, DOB, gender)
- Profile data (bio, photos, occupation, education)
- Location with geospatial indexing
- Preferences (age range, distance, gender preference)
- Privacy settings
- Statistics and activity tracking

### Swipe Model
- Swiper and swiped user references
- Action type (like, dislike, superlike)
- Match status
- Timestamp and location

### Match Model
- Two user references
- Match status (active, unmatched, blocked)
- Conversation metadata
- Match timestamp

## 🚀 Performance Optimization

- **Database Indexing**: Optimized indexes for common queries
- **Redis Caching**: Cache frequently accessed data
- **Connection Pooling**: Efficient database connection management
- **Compression**: Gzip compression for responses
- **Query Optimization**: Lean queries and field selection
- **Geospatial Queries**: Efficient location-based searches

## 📝 Logging

The application uses Winston for comprehensive logging:

- **Error Logs**: `logs/error-YYYY-MM-DD.log`
- **Combined Logs**: `logs/combined-YYYY-MM-DD.log`
- **Access Logs**: `logs/access-YYYY-MM-DD.log`

Logs rotate daily and are retained for 14 days.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🔧 Development

```bash
# Run in development mode with auto-reload
npm run dev

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## 🌐 Deployment

### Environment Variables for Production

Ensure all environment variables are properly set:
- Set `NODE_ENV=production`
- Use strong `JWT_SECRET` and `JWT_REFRESH_SECRET`
- Configure production database URI
- Set up production email service
- Configure Cloudinary for production

### Deployment Platforms

The application can be deployed to:
- **AWS**: EC2, ECS, or Elastic Beanstalk
- **Heroku**: With MongoDB Atlas
- **DigitalOcean**: App Platform or Droplets
- **Google Cloud**: App Engine or Compute Engine
- **Azure**: App Service

## 📈 Scaling Considerations

1. **Horizontal Scaling**: Use load balancers (Nginx, AWS ALB)
2. **Database Sharding**: Partition data for large user bases
3. **Caching Strategy**: Implement Redis for session and data caching
4. **CDN**: Use CDN for static assets and images
5. **Microservices**: Split into services (auth, matching, messaging)
6. **Message Queue**: Use RabbitMQ or SQS for async tasks
7. **Database Replication**: Master-slave setup for read scaling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support, email support@datingapp.com or open an issue in the repository.

## 🙏 Acknowledgments

- Express.js community
- MongoDB team
- All open-source contributors

---

**Built with ❤️ for connecting people**

