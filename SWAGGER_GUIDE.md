# Swagger API Documentation Guide

## 🎯 Overview

This project includes **interactive Swagger/OpenAPI documentation** for all API endpoints. You can view, test, and interact with the API directly from your browser!

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `swagger-jsdoc` - Generate Swagger spec from JSDoc comments
- `swagger-ui-express` - Serve Swagger UI

### 2. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 3. Access Swagger UI

Open your browser and navigate to:

```
http://localhost:5000/api-docs
```

You'll see the interactive Swagger UI with all API endpoints!

## 📚 Swagger UI Features

### 1. **Browse All Endpoints**
- Organized by tags (Authentication, Users, Swipes, Matches, etc.)
- Click on any endpoint to expand details
- View request/response schemas

### 2. **Try It Out**
- Click "Try it out" button on any endpoint
- Fill in parameters and request body
- Click "Execute" to make a real API call
- See the response in real-time

### 3. **Authentication**
- Click "Authorize" button at the top
- Enter your JWT token: `Bearer YOUR_TOKEN_HERE`
- All subsequent requests will include the token

### 4. **View Schemas**
- Scroll to "Schemas" section at the bottom
- See all data models and their structure

## 🔐 How to Test with Authentication

### Step 1: Register a User

1. Find `POST /auth/register` endpoint
2. Click "Try it out"
3. Fill in the request body:

```json
{
  "firstName": "Test",
  "lastName": "User",
  "email": "test@example.com",
  "password": "Password123",
  "dateOfBirth": "1995-01-01",
  "gender": "male",
  "interestedIn": ["female"],
  "agreedToTerms": true,
  "agreedToPrivacyPolicy": true
}
```

4. Click "Execute"
5. Copy the `accessToken` from the response

### Step 2: Authorize

1. Click the "Authorize" button (🔒 icon) at the top right
2. Enter: `Bearer YOUR_ACCESS_TOKEN`
3. Click "Authorize"
4. Click "Close"

### Step 3: Test Protected Endpoints

Now you can test any protected endpoint:
- `GET /auth/me` - Get your profile
- `PUT /users/profile` - Update profile
- `GET /swipes/discover` - Get potential matches
- And more!

## 📖 API Endpoints Overview

### Authentication (8 endpoints)
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `POST /auth/refresh-token` - Refresh access token
- `POST /auth/logout` - Logout
- `GET /auth/me` - Get current user
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password/{token}` - Reset password
- `PUT /auth/change-password` - Change password
- `DELETE /auth/delete-account` - Delete account

### Users (11 endpoints)
- `GET /users/{id}` - Get user profile
- `PUT /users/profile` - Update profile
- `PUT /users/preferences` - Update preferences
- `PUT /users/privacy` - Update privacy settings
- `PUT /users/location` - Update location
- `POST /users/photos` - Upload photos
- `DELETE /users/photos/{photoId}` - Delete photo
- `PUT /users/photos/{photoId}/primary` - Set primary photo
- `POST /users/block/{userId}` - Block user
- `DELETE /users/block/{userId}` - Unblock user
- `GET /users/blocked` - Get blocked users

### Swipes (5 endpoints)
- `GET /swipes/discover` - Get potential matches
- `POST /swipes` - Swipe on user
- `GET /swipes/history` - Get swipe history
- `GET /swipes/likes` - Get users who liked you
- `POST /swipes/undo` - Undo last swipe (Premium)

### Matches (4 endpoints)
- `GET /matches` - Get all matches
- `GET /matches/stats` - Get match statistics
- `GET /matches/{id}` - Get match details
- `DELETE /matches/{id}` - Unmatch

### Filters (2 endpoints)
- `GET /filters/search` - Advanced search
- `GET /filters/options` - Get filter options

### Content (3 endpoints)
- `GET /content/terms` - Terms and Conditions
- `GET /content/privacy` - Privacy Policy
- `GET /content/guidelines` - Community Guidelines

**Total: 33 documented endpoints!**

## 🎨 Swagger UI Screenshots

### Main View
```
┌─────────────────────────────────────────────┐
│  Dating App API                    Authorize │
│  Version 1.0.0                              │
├─────────────────────────────────────────────┤
│  ▼ Authentication                           │
│    POST /auth/register                      │
│    POST /auth/login                         │
│    ...                                      │
│                                             │
│  ▼ Users                                    │
│    GET /users/{id}                          │
│    PUT /users/profile                       │
│    ...                                      │
└─────────────────────────────────────────────┘
```

### Expanded Endpoint
```
┌─────────────────────────────────────────────┐
│  POST /auth/login                           │
│  Login user                                 │
│                                             │
│  Parameters                                 │
│  Request body (required)                    │
│  ┌─────────────────────────────────────┐   │
│  │ {                                   │   │
│  │   "email": "john@example.com",      │   │
│  │   "password": "Password123"         │   │
│  │ }                                   │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [Try it out] [Execute]                     │
└─────────────────────────────────────────────┘
```

## 🔧 Testing Workflow Example

### Complete Test Flow

```bash
# 1. Register
POST /auth/register
→ Get accessToken

# 2. Authorize with token
Click "Authorize" → Enter token

# 3. Update profile
PUT /users/profile
{
  "bio": "Love hiking",
  "occupation": "Engineer"
}

# 4. Update location
PUT /users/location
{
  "longitude": -122.4194,
  "latitude": 37.7749,
  "city": "San Francisco"
}

# 5. Get discover users
GET /swipes/discover?limit=10

# 6. Swipe on a user
POST /swipes
{
  "swipedUserId": "USER_ID_FROM_DISCOVER",
  "action": "like"
}

# 7. Check matches
GET /matches

# 8. Get match stats
GET /matches/stats
```

## 📝 Swagger Configuration

### Location
- **Config**: `src/config/swagger.js`
- **Docs**: `src/docs/*.js`
- **Integration**: `src/app.js`

### Structure
```
src/
├── config/
│   └── swagger.js          # Swagger configuration
├── docs/                   # API documentation
│   ├── auth.js            # Auth endpoints
│   ├── users.js           # User endpoints
│   ├── swipes.js          # Swipe endpoints
│   ├── matches.js         # Match endpoints
│   ├── filters.js         # Filter endpoints
│   └── content.js         # Content endpoints
└── app.js                 # Swagger UI integration
```

## 🎯 Swagger Annotations

Each endpoint is documented using JSDoc comments:

```javascript
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
```

## 🌐 Alternative Access Methods

### 1. Swagger JSON
Get the raw OpenAPI spec:
```
http://localhost:5000/api-docs.json
```

### 2. Import to Postman
1. Open Postman
2. Import → Link
3. Enter: `http://localhost:5000/api-docs.json`
4. All endpoints imported!

### 3. Import to Insomnia
1. Open Insomnia
2. Import/Export → Import Data → From URL
3. Enter: `http://localhost:5000/api-docs.json`

## 🔍 Advanced Features

### 1. **Filter by Tags**
- Click on a tag to filter endpoints
- Show only Authentication, Users, etc.

### 2. **Search**
- Use the search box to find specific endpoints
- Search by path, method, or description

### 3. **Copy as cURL**
- After executing a request
- Click "Copy as cURL"
- Paste in terminal to run

### 4. **Download Responses**
- Click "Download" button
- Save response as JSON file

## 🚀 Production Deployment

### Update Server URL

Edit `src/config/swagger.js`:

```javascript
servers: [
  {
    url: 'https://api.yourdomain.com/api/v1',
    description: 'Production server',
  },
],
```

### Disable in Production (Optional)

If you want to disable Swagger in production:

```javascript
// src/app.js
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
```

## 📊 Benefits

✅ **Interactive Testing** - Test APIs without writing code  
✅ **Auto-Generated** - Documentation stays in sync with code  
✅ **Team Collaboration** - Share API docs with frontend team  
✅ **Client Generation** - Generate client SDKs automatically  
✅ **API Validation** - Ensure requests match schema  
✅ **Professional** - Industry-standard documentation  

## 🎓 Tips & Tricks

### 1. **Save Requests**
- Use Swagger UI to test
- Copy working requests to Postman/Insomnia
- Save for future use

### 2. **Test Error Cases**
- Try invalid data to see error responses
- Test validation rules
- Check rate limiting

### 3. **Explore Schemas**
- Check "Schemas" section
- Understand data structures
- See all available fields

### 4. **Use Examples**
- All endpoints have example requests
- Click "Example Value" to auto-fill
- Modify as needed

## 🐛 Troubleshooting

### Swagger UI Not Loading

```bash
# Check if server is running
curl http://localhost:5000/

# Check Swagger JSON
curl http://localhost:5000/api-docs.json

# Restart server
npm run dev
```

### Authorization Not Working

1. Make sure token format is: `Bearer YOUR_TOKEN`
2. Check token hasn't expired (default: 7 days)
3. Login again to get fresh token

### Endpoints Not Showing

```bash
# Check docs files exist
ls src/docs/

# Verify swagger.js config
cat src/config/swagger.js

# Check for syntax errors in docs
npm run lint
```

## 📚 Additional Resources

- [Swagger Official Docs](https://swagger.io/docs/)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [Swagger UI GitHub](https://github.com/swagger-api/swagger-ui)

## 🎉 Summary

You now have:
- ✅ Interactive API documentation
- ✅ 33 documented endpoints
- ✅ Test all APIs from browser
- ✅ Authentication support
- ✅ Export to Postman/Insomnia
- ✅ Professional documentation

**Access it at: http://localhost:5000/api-docs**

Happy testing! 🚀

