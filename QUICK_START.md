# Quick Start Guide

Get the Dating App Backend up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account
- Git installed

## Step 1: Clone & Install (2 minutes)

```bash
# Clone the repository
git clone <your-repo-url>
cd dating-app-backend

# Install dependencies
npm install
```

## Step 2: Configure Environment (1 minute)

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dating-app
JWT_SECRET=your-secret-key-min-32-characters-long
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-characters
```

**Quick MongoDB Setup:**

```bash
# If you don't have MongoDB installed:
# Option 1: Use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Option 2: Use MongoDB Atlas (free tier)
# Sign up at https://www.mongodb.com/cloud/atlas
# Get connection string and update MONGODB_URI
```

## Step 3: Start the Server (30 seconds)

```bash
# Development mode with auto-reload
npm run dev

# You should see:
# ✓ MongoDB Connected: localhost
# ✓ Server running in development mode on port 5000
```

## 🎉 Bonus: Interactive API Documentation!

Open your browser and visit:

```
http://localhost:5000/api-docs
```

You'll see **Swagger UI** with all API endpoints! You can:
- ✅ Browse all 33 endpoints
- ✅ Test APIs directly from browser
- ✅ No Postman needed!
- ✅ Built-in authentication

See [SWAGGER_GUIDE.md](./SWAGGER_GUIDE.md) for details.

## Step 4: Test the API (1 minute)

### Health Check

```bash
curl http://localhost:5000/api/v1/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-01-11T..."
}
```

### Register a User

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "Password123",
    "dateOfBirth": "1995-01-01",
    "gender": "male",
    "interestedIn": ["female"],
    "agreedToTerms": true,
    "agreedToPrivacyPolicy": true
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

Save the `accessToken` from the response!

### Get Your Profile

```bash
curl http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🎉 You're All Set!

The API is now running and ready to use.

## Next Steps

### 1. Explore the API

Check out the complete API documentation:
- [API Documentation](./API_DOCUMENTATION.md)

### 2. Optional: Setup Additional Services

#### Redis (for caching)
```bash
# Using Docker
docker run -d -p 6379:6379 --name redis redis:alpine

# Update .env
REDIS_HOST=localhost
REDIS_PORT=6379
```

#### Cloudinary (for image uploads)
```bash
# Sign up at https://cloudinary.com
# Get your credentials and add to .env:
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### Email Service (for password reset)
```bash
# Use Gmail, SendGrid, or any SMTP service
# Add to .env:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### 3. Test All Features

#### Update Profile
```bash
curl -X PUT http://localhost:5000/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bio": "Love hiking and coffee",
    "occupation": "Software Engineer",
    "interests": ["hiking", "coffee", "travel"]
  }'
```

#### Update Location
```bash
curl -X PUT http://localhost:5000/api/v1/users/location \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "longitude": -122.4194,
    "latitude": 37.7749,
    "city": "San Francisco",
    "country": "USA"
  }'
```

#### Get Discover Users
```bash
curl http://localhost:5000/api/v1/swipes/discover \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Swipe on a User
```bash
curl -X POST http://localhost:5000/api/v1/swipes \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "swipedUserId": "USER_ID_FROM_DISCOVER",
    "action": "like"
  }'
```

## Common Issues

### MongoDB Connection Error

**Problem:** `MongoServerError: connect ECONNREFUSED`

**Solution:**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Or use Docker
docker start mongodb
```

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Change PORT in .env
PORT=5001

# Or kill the process using port 5000
# On Linux/Mac:
lsof -ti:5000 | xargs kill -9

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### JWT Error

**Problem:** `Invalid or expired token`

**Solution:**
- Make sure you're using the correct token
- Token might have expired (default: 7 days)
- Login again to get a new token

## Development Tools

### Recommended VS Code Extensions

- ESLint
- Prettier
- REST Client (for testing APIs)
- MongoDB for VS Code

### Using REST Client Extension

Create a file `test.http`:

```http
### Health Check
GET http://localhost:5000/api/v1/health

### Register
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "password": "Password123",
  "dateOfBirth": "1996-05-15",
  "gender": "female",
  "interestedIn": ["male"],
  "agreedToTerms": true,
  "agreedToPrivacyPolicy": true
}

### Login
POST http://localhost:5000/api/v1/auth/login
Content-Type: application/json

{
  "email": "jane@example.com",
  "password": "Password123"
}

### Get Profile
GET http://localhost:5000/api/v1/auth/me
Authorization: Bearer YOUR_TOKEN_HERE
```

## Scripts

```bash
# Development with auto-reload
npm run dev

# Production mode
npm start

# Run tests
npm test

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## Project Structure Quick Reference

```
src/
├── config/         # Database, Redis, Cloudinary setup
├── controllers/    # HTTP request handlers
├── services/       # Business logic layer (NEW!)
├── middlewares/    # Auth, validation, error handling
├── models/         # Database schemas
├── routes/         # API endpoints
├── validators/     # Input validation
├── utils/          # Helper functions
├── app.js          # Express setup
└── server.js       # Entry point
```

**Note**: This app follows the **Service Layer Pattern** - all business logic is in the `services/` folder, while controllers only handle HTTP requests/responses.

## API Endpoints Overview

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/logout` - Logout
- `GET /api/v1/auth/me` - Get current user
- `DELETE /api/v1/auth/delete-account` - Delete account

### User Management
- `GET /api/v1/users/:id` - Get user profile
- `PUT /api/v1/users/profile` - Update profile
- `PUT /api/v1/users/preferences` - Update preferences
- `PUT /api/v1/users/location` - Update location
- `POST /api/v1/users/photos` - Upload photos

### Swipes
- `GET /api/v1/swipes/discover` - Get potential matches
- `POST /api/v1/swipes` - Swipe on user
- `GET /api/v1/swipes/history` - Get swipe history
- `GET /api/v1/swipes/likes` - Get users who liked you

### Matches
- `GET /api/v1/matches` - Get all matches
- `GET /api/v1/matches/:id` - Get match details
- `DELETE /api/v1/matches/:id` - Unmatch
- `GET /api/v1/matches/stats` - Get statistics

### Filters
- `GET /api/v1/filters/search` - Advanced search
- `GET /api/v1/filters/options` - Get filter options

### Content (Public)
- `GET /api/v1/content/terms` - Terms and Conditions
- `GET /api/v1/content/privacy` - Privacy Policy
- `GET /api/v1/content/guidelines` - Community Guidelines

## Need Help?

- 📖 [Full Documentation](./README.md)
- 🏗️ [Architecture Guide](./ARCHITECTURE.md) - **Learn about Service Layer Pattern**
- 📚 [Swagger API Docs](http://localhost:5000/api-docs) - **Interactive Testing!**
- 📘 [Swagger Guide](./SWAGGER_GUIDE.md)
- 🔧 [API Reference](./API_DOCUMENTATION.md)
- 🚀 [Deployment Guide](./DEPLOYMENT.md)
- 📁 [Folder Structure](./FOLDER_STRUCTURE.md)
- 🤝 [Contributing](./CONTRIBUTING.md)

## Support

- Open an issue on GitHub
- Email: support@datingapp.com

---

**Happy Coding! 💻❤️**

