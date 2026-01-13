# Unified Authentication Flow Guide

## Overview

The API provides a **unified authentication system** that handles both login and registration through a single flow using **phone number as the unique identifier**. This eliminates the need for separate login and register endpoints on the frontend.

## How It Works

The system uses a **two-step approach**:

1. **Step 1**: Check if user exists by phone number (`/auth/check`)
2. **Step 2**: Authenticate (login or register) (`/auth/authenticate`)

Alternatively, you can use the **single-step approach** if you already have all the data.

**Key Point**: Phone number is the primary unique identifier. Email is optional.

---

## 🚀 Recommended Flow (Two-Step)

### Step 1: Check User Status

**Endpoint**: `POST /api/v1/auth/check`

**Purpose**: Determine if the user needs to login or register

**Request**:
```json
{
  "phoneNumber": "+1234567890"  // Phone number is the unique identifier
}
```

**Response (User Exists)**:
```json
{
  "success": true,
  "message": "User found. Please enter your password to continue.",
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

**Response (User Doesn't Exist)**:
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

### Step 2A: Login (If User Exists)

**Endpoint**: `POST /api/v1/auth/authenticate`

**Request**:
```json
{
  "phoneNumber": "+1234567890",
  "password": "Password123"
}
```

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
      "photos": [...],
      "bio": "...",
      // ... full user profile
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "redirectTo": "/discover"  // Frontend should redirect here
  }
}
```

### Step 2B: Register (If User Doesn't Exist)

**Endpoint**: `POST /api/v1/auth/authenticate`

**Request**:
```json
{
  "phoneNumber": "+1234567890",
  "password": "Password123",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",  // Optional
  "dateOfBirth": "1995-01-01",
  "gender": "male",
  "interestedIn": ["female"],
  "agreedToTerms": true,
  "agreedToPrivacyPolicy": true
}
```

**Response**:
```json
{
  "success": true,
  "message": "Registration successful! Welcome aboard!",
  "data": {
    "action": "register",
    "isNewUser": true,
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "phoneNumber": "+1234567890",
      "email": "john@example.com",
      // ... new user profile
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "redirectTo": "/onboarding"  // Frontend should redirect here
  }
}
```

---

## 🎯 Frontend Implementation Example

### React/TypeScript Example

```typescript
// Step 1: Check if user exists by phone number
const checkUser = async (phoneNumber: string) => {
  const response = await fetch('/api/v1/auth/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber })
  });
  
  const result = await response.json();
  
  if (result.data.exists) {
    // Show password input for login
    showLoginForm(result.data.user);
  } else {
    // Show registration form
    showRegistrationForm(result.data.phoneNumber);
  }
};

// Step 2: Authenticate (login or register)
const authenticate = async (data: AuthData) => {
  const response = await fetch('/api/v1/auth/authenticate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  const result = await response.json();
  
  if (result.success) {
    // Save tokens
    localStorage.setItem('accessToken', result.data.tokens.accessToken);
    localStorage.setItem('refreshToken', result.data.tokens.refreshToken);
    
    // Redirect based on response
    if (result.data.isNewUser) {
      router.push('/onboarding'); // New user - complete profile
    } else {
      router.push('/discover'); // Existing user - go to app
    }
  }
};
```

### Complete Flow Example

```typescript
// 1. User enters phone number
const handlePhoneSubmit = async (phoneNumber: string) => {
  try {
    const response = await checkUser(phoneNumber);
    
    if (response.data.action === 'login') {
      // User exists - show password field
      setShowPasswordField(true);
      setUserInfo(response.data.user);
    } else {
      // User doesn't exist - show registration form
      setShowRegistrationForm(true);
    }
  } catch (error) {
    console.error('Error checking user:', error);
  }
};

// 2. User submits credentials
const handleAuthSubmit = async (formData: FormData) => {
  try {
    const response = await authenticate(formData);
    
    // Store tokens
    storeTokens(response.data.tokens);
    
    // Redirect based on user status
    navigate(response.data.redirectTo);
  } catch (error) {
    console.error('Authentication error:', error);
  }
};
```

---

## 📋 Field Requirements

### For Login (Existing User)
- ✅ `phoneNumber` - **Required** (unique identifier)
- ✅ `password` - **Required**

### For Registration (New User)
- ✅ `phoneNumber` - **Required** (unique identifier)
- ✅ `password` - **Required** (min 8 chars, must contain uppercase, lowercase, and number)
- ✅ `firstName` - **Required**
- ✅ `lastName` - **Required**
- ✅ `dateOfBirth` - **Required** (format: YYYY-MM-DD, must be 18+)
- ✅ `gender` - **Required** (male, female, non-binary, other)
- ✅ `interestedIn` - **Required** (array: male, female, non-binary, other, everyone)
- ✅ `agreedToTerms` - **Required** (must be true)
- ✅ `agreedToPrivacyPolicy` - **Required** (must be true)
- ⚪ `email` - Optional

---

## 🔄 Redirect Logic

The API provides a `redirectTo` field in the response to guide navigation:

| User Status | `redirectTo` Value | Frontend Action |
|-------------|-------------------|-----------------|
| **Existing User (Login)** | `/discover` | Navigate to main app/discover page |
| **New User (Register)** | `/onboarding` | Navigate to profile completion flow |

---

## 🛡️ Error Handling

### Common Error Responses

**Invalid Credentials (Login)**:
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Missing Registration Fields**:
```json
{
  "success": false,
  "message": "Please provide all required registration information"
}
```

**Age Validation Failed**:
```json
{
  "success": false,
  "message": "You must be at least 18 years old to register"
}
```

**Password Too Weak**:
```json
{
  "success": false,
  "message": "Password must contain at least one uppercase letter, one lowercase letter, and one number"
}
```

---

## 🔐 Token Management

After successful authentication, you'll receive:

```json
{
  "tokens": {
    "accessToken": "short-lived token for API requests",
    "refreshToken": "long-lived token to get new access tokens"
  }
}
```

### Using Access Token

Include the access token in all authenticated requests:

```javascript
fetch('/api/v1/users/profile', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
```

### Refreshing Tokens

When the access token expires, use the refresh token:

```javascript
const refreshAccessToken = async () => {
  const response = await fetch('/api/v1/auth/refresh-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      refreshToken: localStorage.getItem('refreshToken')
    })
  });
  
  const result = await response.json();
  localStorage.setItem('accessToken', result.data.tokens.accessToken);
  localStorage.setItem('refreshToken', result.data.tokens.refreshToken);
};
```

---

## 📱 Phone Number as Primary Identifier

The system uses **phone number as the unique identifier** for all users:

**Phone Number Format**:
```json
{
  "phoneNumber": "+1234567890"
}
```

**Supported Formats**:
- `+1234567890`
- `+1 234 567 8900`
- `+1 (234) 567-8900`
- `1234567890`

The API automatically normalizes phone numbers by removing spaces, dashes, and parentheses.

**Email is Optional**: Users can optionally provide an email address during registration for password recovery and notifications.

---

## 🔄 Backward Compatibility

The traditional separate endpoints are still available for backward compatibility:

- `POST /api/v1/auth/register` - Traditional registration
- `POST /api/v1/auth/login` - Traditional login

However, **it's recommended to use the unified flow** (`/auth/check` + `/auth/authenticate`) for new implementations.

---

## 🎨 UI/UX Recommendations

### Suggested User Flow

1. **Initial Screen**: Single input field for phone number
   - Button: "Continue"
   - Format: +1 (XXX) XXX-XXXX

2. **After Check**:
   - **If user exists**: Show welcome message with user's name and photo, add password field
     - "Welcome back, John! Please enter your password"
   - **If user doesn't exist**: Show registration form
     - "Let's create your account!"

3. **After Authentication**:
   - **Existing user**: Redirect to `/discover`
   - **New user**: Redirect to `/onboarding` for profile completion

### Example UI Flow

```
┌─────────────────────────┐
│  Enter Phone Number     │
│  [+1 (___) ___-____]   │
│  [Continue Button]      │
└─────────────────────────┘
           ↓
    /auth/check
           ↓
     ┌─────┴─────┐
     ↓           ↓
┌─────────┐  ┌─────────┐
│ Login   │  │Register │
│ Form    │  │ Form    │
└─────────┘  └─────────┘
     ↓           ↓
    /auth/authenticate
           ↓
     ┌─────┴─────┐
     ↓           ↓
┌─────────┐  ┌──────────┐
│/discover│  │/onboarding│
└─────────┘  └──────────┘
```

---

## 🧪 Testing

### Test with Swagger UI

Access the interactive API documentation at:
```
http://localhost:5000/api-docs
```

Navigate to the **Authentication** section to test the unified flow.

### cURL Examples

**Check User**:
```bash
curl -X POST http://localhost:5000/api/v1/auth/check \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+1234567890"}'
```

**Login**:
```bash
curl -X POST http://localhost:5000/api/v1/auth/authenticate \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+1234567890",
    "password": "Password123"
  }'
```

**Register**:
```bash
curl -X POST http://localhost:5000/api/v1/auth/authenticate \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+1987654321",
    "password": "Password123",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "dateOfBirth": "1995-06-15",
    "gender": "female",
    "interestedIn": ["male"],
    "agreedToTerms": true,
    "agreedToPrivacyPolicy": true
  }'
```

---

## 📞 Support

For questions or issues with the unified authentication flow, please refer to:
- API Documentation: `/api-docs`
- Swagger JSON: `/api-docs.json`

---

## ✅ Summary

**Key Benefits**:
- ✅ Single, unified authentication flow
- ✅ Phone number as unique identifier (simpler for users)
- ✅ Automatic detection of user status
- ✅ Clear redirect instructions
- ✅ Email is optional (privacy-friendly)
- ✅ Backward compatible with traditional endpoints
- ✅ Better UX with contextual forms

**Recommended Endpoints**:
1. `POST /api/v1/auth/check` - Check user status by phone
2. `POST /api/v1/auth/authenticate` - Login or register

**Response Fields to Use**:
- `data.action` - "login" or "register"
- `data.isNewUser` - true for new registrations
- `data.redirectTo` - Where to navigate after success
- `data.tokens` - Access and refresh tokens
- `data.phoneNumber` - User's phone number

