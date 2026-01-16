# Dating App API Documentation

**Version**: 1.0.0  
**Base URL**: `http://localhost:5000/api/v1`  
**Production URL**: `https://api.datingapp.com/api/v1`  
**Last Updated**: January 13, 2026

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [User Management](#user-management)
3. [Swipes](#swipes)
4. [Matches](#matches)
5. [Filters](#filters)
6. [Configuration](#configuration)
7. [Content](#content)
8. [Error Handling](#error-handling)
9. [Rate Limiting](#rate-limiting)

---

## 🔐 Authentication

### Overview
The API uses **OTP (One-Time Password)** based authentication with phone numbers. No passwords required!

**Authentication Flow for NEW Users**:
1. Check if user exists (`POST /auth/check`) - Optional
2. Send OTP to phone number (`POST /auth/send-otp`) - Optional
3. Verify OTP (`POST /auth/verify-otp`) - Just phone + OTP
4. Receive JWT tokens + `needsOnboarding: true`
5. Complete profile (`POST /users/complete-profile`) - Provide registration data
6. Redirect to `/discover`

**Authentication Flow for EXISTING Users**:
1. Check if user exists (`POST /auth/check`) - Optional
2. Send OTP to phone number (`POST /auth/send-otp`) - Optional
3. Verify OTP (`POST /auth/verify-otp`) - Just phone + OTP
4. Receive JWT tokens + `needsOnboarding: false`
5. Redirect to `/discover`

**Quick Test Flow** (Using Master OTP):
1. Call `/auth/verify-otp` with phone + OTP `123456`
2. If `needsOnboarding: true`, call `/users/complete-profile`
3. Done!

---

### 1. Check User Status

Check if a phone number is already registered.

**Endpoint**: `POST /auth/check`  
**Authentication**: Not required

**Request Body**:
```json
{
  "phoneNumber": "+1234567890"
}
```

**Response (Existing User)**:
```json
{
  "success": true,
  "message": "User found. Please verify your phone number.",
  "data": {
    "exists": true,
    "action": "login",
    "phoneNumber": "+1234567890",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "phoneNumber": "+1234567890",
      "email": "john@example.com",
      "profilePhoto": "https://..."
    }
  }
}
```

**Response (New User)**:
```json
{
  "success": true,
  "message": "User not found. Please complete registration.",
  "data": {
    "exists": false,
    "action": "register",
    "phoneNumber": "+1234567890"
  }
}
```

---

### 2. Send OTP

Send a 6-digit OTP to the user's phone number.

**Endpoint**: `POST /auth/send-otp`  
**Authentication**: Not required  
**Rate Limit**: 5 requests per 15 minutes per IP

**Request Body**:
```json
{
  "phoneNumber": "+1234567890",
  "purpose": "login"
}
```

**Parameters**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| phoneNumber | string | Yes | User's phone number (international format) |
| purpose | string | No | Either "login" or "register" (default: "login") |

**Response**:
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "data": {
    "phoneNumber": "+1234567890",
    "purpose": "login",
    "expiresIn": 300,
    "otp": "123456"
  }
}
```

**Notes**:
- ✅ **Always returns 200** - OTP is sent regardless of whether the user exists or not
- This prevents phone number enumeration attacks (security best practice)
- 🔓 **OTP is ALWAYS `123456`** - For easy testing and development
- OTP is valid for **5 minutes**
- OTP is **6 digits** numeric
- In development, `otp` field is included in response
- In production, consider enabling random OTP generation and SMS sending
- User existence check happens during OTP verification, not during OTP sending

---

### 3. Verify OTP (Login)

Verify OTP for existing users to login.

**Endpoint**: `POST /auth/verify-otp`  
**Authentication**: Not required  
**Rate Limit**: 5 requests per 15 minutes per IP

**Request Body**:
```json
{
  "phoneNumber": "+1234567890",
  "otp": "123456"
}
```

**Parameters**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| phoneNumber | string | Yes | User's phone number |
| otp | string | Yes | 6-digit OTP received via SMS (or use `123456` as master OTP) |

**Response**:
```json
{
  "success": true,
  "message": "Login successful! Welcome back!",
  "data": {
    "action": "login",
    "isNewUser": false,
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "phoneNumber": "+1234567890",
      "email": "john@example.com",
      "phoneVerified": true,
      "phoneVerifiedAt": "2026-01-13T10:30:00.000Z",
      "dateOfBirth": "1995-01-01T00:00:00.000Z",
      "gender": "male",
      "interestedIn": ["female"],
      "bio": "Love hiking and coffee",
      "photos": [
        {
          "url": "https://...",
          "isPrimary": true
        }
      ],
      "location": {
        "city": "San Francisco",
        "country": "USA"
      },
      "isVerified": false,
      "isPremium": false,
      "createdAt": "2026-01-01T00:00:00.000Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "redirectTo": "/discover"
  }
}
```

**Token Information**:
- `accessToken`: Valid for **15 minutes**, use for API requests
- `refreshToken`: Valid for **7 days**, use to get new access token
- Store both tokens securely on client side

---

### 4. Verify OTP (New User - Minimal)

Verify OTP for new users WITHOUT registration data. Creates minimal profile, user completes onboarding later.

**Endpoint**: `POST /auth/verify-otp`  
**Authentication**: Not required  
**Rate Limit**: 5 requests per 15 minutes per IP

**Request Body**:
```json
{
  "phoneNumber": "+1234567890",
  "otp": "123456"
}
```

**Parameters**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| phoneNumber | string | Yes | User's phone number |
| otp | string | Yes | 6-digit OTP (use `123456` for testing) |

**Response**:
```json
{
  "success": true,
  "message": "Registration successful! Welcome aboard!",
  "data": {
    "action": "register",
    "isNewUser": true,
    "needsOnboarding": true,
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "User",
      "lastName": "7890",
      "phoneNumber": "+1234567890",
      "email": "1234567890@temp.dating.app",
      "phoneVerified": true,
      "phoneVerifiedAt": "2026-01-14T10:30:00.000Z",
      "dateOfBirth": "2000-01-01T00:00:00.000Z",
      "gender": "other",
      "interestedIn": ["everyone"]
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "redirectTo": "/onboarding"
  }
}
```

**Note**: User profile has temporary data. Use `/users/complete-profile` to finish onboarding.

---

### 5. Resend OTP

Resend OTP if the previous one expired or wasn't received.

**Endpoint**: `POST /auth/resend-otp`  
**Authentication**: Not required  
**Rate Limit**: 5 requests per 15 minutes per IP

**Request Body**:
```json
{
  "phoneNumber": "+1234567890",
  "purpose": "login"
}
```

**Response**: Same as Send OTP

**Note**: Wait at least 30 seconds before allowing resend in your UI.

---

### 6. Refresh Token

Get a new access token using refresh token.

**Endpoint**: `POST /auth/refresh-token`  
**Authentication**: Not required

**Request Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response**:
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

---

### 7. Get Current User

Get the authenticated user's profile.

**Endpoint**: `GET /auth/me`  
**Authentication**: Required

**Headers**:
```
Authorization: Bearer <access_token>
```

**Response**:
```json
{
  "success": true,
  "message": "User profile retrieved",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "phoneNumber": "+1234567890",
      "email": "john@example.com",
      // ... full user profile
    }
  }
}
```

---

### 8. Logout

Logout the current user (invalidates refresh token).

**Endpoint**: `POST /auth/logout`  
**Authentication**: Required

**Headers**:
```
Authorization: Bearer <access_token>
```

**Response**:
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### 9. Delete Account

Permanently delete user account.

**Endpoint**: `DELETE /auth/delete-account`  
**Authentication**: Required

**Headers**:
```
Authorization: Bearer <access_token>
```

**Request Body**:
```json
{
  "phoneNumber": "+1234567890"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

---

## 👤 User Management

All user endpoints require authentication. Include the access token in the Authorization header:
```
Authorization: Bearer <access_token>
```

---

### 1. Get User Profile

Get any user's profile by ID.

**Endpoint**: `GET /users/{id}`  
**Authentication**: Required

**Response**:
```json
{
  "success": true,
  "message": "User profile retrieved",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "age": 29,
      "bio": "Love hiking and coffee",
      "photos": [...],
      "location": {
        "city": "San Francisco",
        "country": "USA"
      }
    }
  }
}
```

---

### 2. Complete Profile (Onboarding)

Complete user profile after minimal registration. Required for users who verified OTP without providing full registration data.

**Endpoint**: `POST /users/complete-profile`  
**Authentication**: Required

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "dateOfBirth": "1995-01-01",
  "gender": "male",
  "interestedIn": ["female"],
  "bio": "Love hiking and coffee",
  "occupation": "Software Engineer",
  "height": 180,
  "interests": ["hiking", "coffee", "travel"]
}
```

**Parameters**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| firstName | string | Yes | User's first name |
| lastName | string | Yes | User's last name |
| dateOfBirth | string | Yes | Date of birth (YYYY-MM-DD, must be 18+) |
| gender | string | Yes | One of: "male", "female", "non-binary", "other" |
| interestedIn | array | Yes | Array of: "male", "female", "non-binary", "other", "everyone" |
| email | string | No | User's email address |
| bio | string | No | User bio (max 500 chars) |
| occupation | string | No | User's occupation |
| education | string | No | Education level |
| height | number | No | Height in cm |
| interests | array | No | Array of interests |
| location | object | No | User location |

**Response**:
```json
{
  "success": true,
  "message": "Profile completed successfully",
  "data": {
    "user": {
      // complete user profile
    }
  }
}
```

---

### 3. Update Profile

Update the current user's profile.

**Endpoint**: `PUT /users/profile`  
**Authentication**: Required

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Love hiking and coffee",
  "occupation": "Software Engineer",
  "education": "Bachelor's Degree",
  "height": 180,
  "interests": ["hiking", "coffee", "travel"]
}
```

**Response**:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      // updated user profile
    }
  }
}
```

---

### 3. Update Preferences

Update matching preferences.

**Endpoint**: `PUT /users/preferences`  
**Authentication**: Required

**Request Body**:
```json
{
  "ageRange": {
    "min": 25,
    "max": 35
  },
  "maxDistance": 50,
  "showMe": "female"
}
```

**Parameters**:
| Field | Type | Description |
|-------|------|-------------|
| ageRange.min | number | Minimum age (18-100) |
| ageRange.max | number | Maximum age (18-100) |
| maxDistance | number | Maximum distance in km (1-500) |
| showMe | string | "male", "female", "non-binary", "other", "everyone" |

**Response**:
```json
{
  "success": true,
  "message": "Preferences updated successfully",
  "data": {
    "preferences": {
      // updated preferences
    }
  }
}
```

---

### 4. Update Privacy Settings

Update privacy settings.

**Endpoint**: `PUT /users/privacy`  
**Authentication**: Required

**Request Body**:
```json
{
  "showAge": true,
  "showDistance": true,
  "showOnlineStatus": false,
  "incognitoMode": false
}
```

**Response**:
```json
{
  "success": true,
  "message": "Privacy settings updated successfully"
}
```

---

### 5. Update Location

Update user's location.

**Endpoint**: `PUT /users/location`  
**Authentication**: Required

**Request Body**:
```json
{
  "longitude": -122.4194,
  "latitude": 37.7749,
  "city": "San Francisco",
  "country": "USA"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Location updated successfully"
}
```

---

### 6. Upload Photos

Upload user photos (max 6 photos).

**Endpoint**: `POST /users/photos`  
**Authentication**: Required (Verified users only)  
**Content-Type**: `multipart/form-data`

**Request Body**:
```
photos: [File, File, ...]
```

**Response**:
```json
{
  "success": true,
  "message": "Photos uploaded successfully",
  "data": {
    "photos": [
      {
        "_id": "...",
        "url": "https://...",
        "isPrimary": false
      }
    ]
  }
}
```

---

### 7. Delete Photo

Delete a user photo.

**Endpoint**: `DELETE /users/photos/{photoId}`  
**Authentication**: Required

**Response**:
```json
{
  "success": true,
  "message": "Photo deleted successfully"
}
```

---

### 8. Set Primary Photo

Set a photo as primary (profile picture).

**Endpoint**: `PUT /users/photos/{photoId}/primary`  
**Authentication**: Required

**Response**:
```json
{
  "success": true,
  "message": "Primary photo updated successfully"
}
```

---

### 9. Block User

Block another user.

**Endpoint**: `POST /users/block/{userId}`  
**Authentication**: Required

**Response**:
```json
{
  "success": true,
  "message": "User blocked successfully"
}
```

---

### 10. Unblock User

Unblock a previously blocked user.

**Endpoint**: `DELETE /users/block/{userId}`  
**Authentication**: Required

**Response**:
```json
{
  "success": true,
  "message": "User unblocked successfully"
}
```

---

### 11. Get Blocked Users

Get list of blocked users.

**Endpoint**: `GET /users/blocked`  
**Authentication**: Required

**Response**:
```json
{
  "success": true,
  "message": "Blocked users retrieved successfully",
  "data": {
    "blockedUsers": [
      {
        "_id": "...",
        "firstName": "...",
        "blockedAt": "2026-01-13T10:30:00.000Z"
      }
    ]
  }
}
```

---

## 💘 Swipes

All swipe endpoints require authentication and verified account.

---

### 1. Get Discover Users

Get potential matches for swiping.

**Endpoint**: `GET /swipes/discover?limit=20`  
**Authentication**: Required (Verified users only)

**Query Parameters**:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| limit | number | 20 | Number of users to return |

**Response**:
```json
{
  "success": true,
  "message": "Discover users retrieved",
  "data": {
    "users": [
      {
        "_id": "...",
        "firstName": "Jane",
        "age": 28,
        "bio": "...",
        "photos": [...],
        "distance": 5.2
      }
    ],
    "count": 20
  }
}
```

---

### 2. Swipe on User

Swipe left (dislike), right (like), or super like on a user.

**Endpoint**: `POST /swipes`  
**Authentication**: Required (Verified users only)  
**Rate Limit**: 100 swipes per day for free users

**Request Body**:
```json
{
  "swipedUserId": "507f1f77bcf86cd799439011",
  "action": "like"
}
```

**Parameters**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| swipedUserId | string | Yes | ID of user being swiped |
| action | string | Yes | "like", "dislike", or "superlike" |

**Response (Match)**:
```json
{
  "success": true,
  "message": "It's a match!",
  "data": {
    "swipe": {
      "_id": "...",
      "action": "like"
    },
    "isMatch": true,
    "match": {
      "_id": "...",
      "user": {
        "_id": "...",
        "firstName": "Jane",
        "photos": [...]
      },
      "createdAt": "2026-01-13T10:30:00.000Z"
    }
  }
}
```

**Response (No Match)**:
```json
{
  "success": true,
  "message": "Swipe recorded successfully",
  "data": {
    "swipe": {
      "_id": "...",
      "action": "like"
    },
    "isMatch": false
  }
}
```

---

### 3. Get Swipe History

Get user's swipe history.

**Endpoint**: `GET /swipes/history?page=1&limit=20&action=like`  
**Authentication**: Required (Verified users only)

**Query Parameters**:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 20 | Items per page |
| action | string | all | Filter by: "like", "dislike", "superlike" |

**Response**:
```json
{
  "success": true,
  "message": "Swipe history retrieved",
  "data": {
    "swipes": [
      {
        "_id": "...",
        "swipedUser": {
          "_id": "...",
          "firstName": "Jane"
        },
        "action": "like",
        "createdAt": "2026-01-13T10:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  }
}
```

---

### 4. Get Users Who Liked Me

Get users who liked you.

**Endpoint**: `GET /swipes/likes`  
**Authentication**: Required (Verified users only)

**Response**:
```json
{
  "success": true,
  "message": "Users who liked you retrieved",
  "data": {
    "users": [
      {
        "_id": "...",
        "firstName": "Jane",
        "age": 28,
        "photos": [...],
        "likedAt": "2026-01-13T10:30:00.000Z"
      }
    ],
    "count": 5
  }
}
```

---

### 5. Undo Last Swipe

Undo the last swipe (Premium feature).

**Endpoint**: `POST /swipes/undo`  
**Authentication**: Required (Verified + Premium users only)

**Response**:
```json
{
  "success": true,
  "message": "Swipe undone successfully",
  "data": {
    "undoneSwipe": {
      "_id": "...",
      "action": "dislike"
    }
  }
}
```

---

## 💑 Matches

All match endpoints require authentication and verified account.

---

### 1. Get Matches

Get all user matches.

**Endpoint**: `GET /matches?page=1&limit=20&status=active`  
**Authentication**: Required (Verified users only)

**Query Parameters**:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 20 | Items per page |
| status | string | active | Filter: "active", "unmatched", "blocked" |

**Response**:
```json
{
  "success": true,
  "message": "Matches retrieved successfully",
  "data": {
    "matches": [
      {
        "_id": "...",
        "user": {
          "_id": "...",
          "firstName": "Jane",
          "age": 28,
          "photos": [...],
          "lastMessage": "Hey! How are you?",
          "lastMessageAt": "2026-01-13T10:30:00.000Z"
        },
        "matchedAt": "2026-01-13T09:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15,
      "totalPages": 1
    }
  }
}
```

---

### 2. Get Match Statistics

Get match statistics for current user.

**Endpoint**: `GET /matches/stats`  
**Authentication**: Required (Verified users only)

**Response**:
```json
{
  "success": true,
  "message": "Match statistics retrieved",
  "data": {
    "stats": {
      "totalMatches": 25,
      "matchesWithConversation": 15,
      "matchesWithoutConversation": 10,
      "recentMatches": 5
    }
  }
}
```

---

### 3. Get Match Details

Get details of a specific match.

**Endpoint**: `GET /matches/{id}`  
**Authentication**: Required (Verified users only)

**Response**:
```json
{
  "success": true,
  "message": "Match details retrieved",
  "data": {
    "match": {
      "_id": "...",
      "user": {
        "_id": "...",
        "firstName": "Jane",
        "age": 28,
        "bio": "...",
        "photos": [...],
        "interests": [...]
      },
      "matchedAt": "2026-01-13T09:00:00.000Z",
      "lastMessageAt": "2026-01-13T10:30:00.000Z"
    }
  }
}
```

---

### 4. Unmatch

Remove a match (unmatch with user).

**Endpoint**: `DELETE /matches/{id}`  
**Authentication**: Required (Verified users only)

**Request Body** (Optional):
```json
{
  "reason": "Not interested anymore"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Unmatched successfully"
}
```

---

## 🔍 Filters

Advanced search and filtering. Requires authentication and verified account.

---

### 1. Search Users

Search users with advanced filters.

**Endpoint**: `GET /filters/search`  
**Authentication**: Required (Verified users only)

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 20) |
| minAge | number | Minimum age (18+) |
| maxAge | number | Maximum age (max: 100) |
| gender | string | Gender filter |
| maxDistance | number | Maximum distance in km (max: 500) |
| minHeight | number | Minimum height in cm (min: 100) |
| maxHeight | number | Maximum height in cm (max: 250) |
| education | string | Education level |
| interests | array | Array of interests |
| city | string | City name |
| country | string | Country name |

**Example**:
```
GET /filters/search?minAge=25&maxAge=35&gender=female&maxDistance=50&interests=hiking,coffee
```

**Response**:
```json
{
  "success": true,
  "message": "Search results retrieved",
  "data": {
    "users": [
      {
        "_id": "...",
        "firstName": "Jane",
        "age": 28,
        "distance": 12.5,
        "photos": [...],
        "interests": ["hiking", "coffee"]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  }
}
```

---

### 2. Get Filter Options

Get available filter options.

**Endpoint**: `GET /filters/options`  
**Authentication**: Required (Verified users only)

**Response**:
```json
{
  "success": true,
  "message": "Filter options retrieved",
  "data": {
    "options": {
      "genders": ["male", "female", "non-binary", "other"],
      "educationLevels": ["high_school", "bachelors", "masters", ...],
      "ageRange": { "min": 18, "max": 100 },
      "heightRange": { "min": 100, "max": 250 },
      "distanceRange": { "min": 1, "max": 500 }
    }
  }
}
```

---

## ⚙️ Configuration

Public endpoints for getting app configuration options.

---

### 1. Get All Config

Get all configuration options.

**Endpoint**: `GET /config`  
**Authentication**: Not required

**Response**:
```json
{
  "success": true,
  "message": "Configuration options retrieved successfully",
  "data": {
    "genders": [
      { "value": "male", "label": "Male" },
      { "value": "female", "label": "Female" }
    ],
    "datingIntentions": [...],
    "religions": [...],
    "hobbies": [...]
    // ... all config options
  }
}
```

---

### 2. Get Config Keys

Get all available configuration keys.

**Endpoint**: `GET /config/keys`  
**Authentication**: Not required

**Response**:
```json
{
  "success": true,
  "message": "Available configuration keys retrieved",
  "data": {
    "keys": [
      "genders",
      "interestedIn",
      "datingIntentions",
      "religions",
      "hobbies",
      ...
    ]
  }
}
```

---

### 3. Get Onboarding Options

Get options needed for user onboarding.

**Endpoint**: `GET /config/onboarding`  
**Authentication**: Not required

**Response**:
```json
{
  "success": true,
  "message": "Onboarding options retrieved",
  "data": {
    "genders": [...],
    "interestedIn": [...],
    "datingIntentions": [...],
    "heightRange": { "min": 100, "max": 250, "unit": "cm" },
    "ageRange": { "min": 18, "max": 100 }
  }
}
```

---

### 4. Get Specific Config

Get a specific configuration by key.

**Endpoint**: `GET /config/{key}`  
**Authentication**: Not required

**Example**: `GET /config/genders`

**Response**:
```json
{
  "success": true,
  "message": "Configuration for 'genders' retrieved",
  "data": {
    "genders": [
      { "value": "male", "label": "Male" },
      { "value": "female", "label": "Female" },
      { "value": "non-binary", "label": "Non-Binary" },
      { "value": "other", "label": "Other" }
    ]
  }
}
```

---

## 📄 Content

Public endpoints for static content.

---

### 1. Get Terms and Conditions

**Endpoint**: `GET /content/terms`  
**Authentication**: Not required

---

### 2. Get Privacy Policy

**Endpoint**: `GET /content/privacy`  
**Authentication**: Not required

---

### 3. Get Community Guidelines

**Endpoint**: `GET /content/guidelines`  
**Authentication**: Not required

---

## ❌ Error Handling

### Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [
    "Detailed error 1",
    "Detailed error 2"
  ]
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created (registration) |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 409 | Conflict (duplicate resource) |
| 429 | Too Many Requests (rate limit) |
| 500 | Internal Server Error |

### Common Errors

**Invalid OTP**:
```json
{
  "success": false,
  "message": "Invalid OTP"
}
```

**OTP Expired**:
```json
{
  "success": false,
  "message": "OTP has expired"
}
```

**Unauthorized**:
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**Validation Error**:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "First name is required",
    "Age must be at least 18"
  ]
}
```

**Rate Limit Exceeded**:
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

---

## 🚦 Rate Limiting

### Limits

| Endpoint Type | Limit |
|---------------|-------|
| Auth endpoints | 5 requests per 15 minutes per IP |
| Swipe action | 100 swipes per day (free users) |
| API-wide | 100 requests per 15 minutes per IP |

### Rate Limit Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642089600
```

---

## 🔐 Authentication Headers

For all protected endpoints, include the access token:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📱 Phone Number Format

Phone numbers should be in international format:

**Accepted Formats**:
- `+1234567890`
- `+1 234 567 8900`
- `+1 (234) 567-8900`

The API automatically normalizes phone numbers.

---

## 🧪 Testing

### OTP is Always 123456

🔓 **ALL OTPs are `123456`** - Both generated OTPs and the master OTP!

- When you call `/send-otp`, the generated OTP is always `123456`
- You can also use `123456` without calling `/send-otp` first (master OTP)
- This makes testing super easy!

**Quick Test Example**:
```bash
# Register a new user instantly
POST /auth/verify-otp
{
  "phoneNumber": "+1234567890",
  "otp": "123456",
  "firstName": "Test",
  "lastName": "User",
  "dateOfBirth": "1995-01-01",
  "gender": "male",
  "interestedIn": ["female"],
  "agreedToTerms": true,
  "agreedToPrivacyPolicy": true
}

# Login existing user instantly
POST /auth/verify-otp
{
  "phoneNumber": "+1234567890",
  "otp": "123456"
}
```

### Development Environment

**Base URL**: `http://localhost:5000/api/v1`

In development mode:
- 🔓 **All OTPs are `123456`** (both generated and master OTP)
- OTP is returned in the API response
- OTP is logged to server console
- No actual SMS is sent
- Perfect for testing!

### Production Environment

**Base URL**: `https://api.datingapp.com/api/v1`

⚠️ **Important for Production**:
- Currently, OTP generation is hardcoded to `123456`
- You should enable random OTP generation before production
- Uncomment the random generation code in `src/models/OTP.js`
- Enable SMS service integration
- Consider disabling master OTP or using environment variable

---

## 📞 Support

For API support or questions:
- **Email**: api-support@datingapp.com
- **Documentation**: `/api-docs`
- **Status**: status.datingapp.com

---

## 📝 Changelog

### Version 1.0.0 (January 13, 2026)
- ✅ Implemented OTP-based authentication
- ✅ Removed password-based authentication
- ✅ Phone number as primary identifier
- ✅ Email is now optional
- ✅ Added phone verification tracking
- ✅ Simplified authentication flow

---

**Last Updated**: January 13, 2026  
**API Version**: 1.0.0
