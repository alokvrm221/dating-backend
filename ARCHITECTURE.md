# Architecture Overview

## Service Layer Pattern

This dating app backend follows the **Service Layer Pattern**, which separates business logic from HTTP handling for better maintainability and scalability.

## Layer Structure

```
┌─────────────────────────────────────────────────────────────┐
│                         Client/Frontend                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      Routes (API Endpoints)                  │
│  - Define URL paths and HTTP methods                        │
│  - Map requests to controllers                              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Middleware Layer                          │
│  - Authentication (JWT verification)                        │
│  - Authorization (role/permission checks)                   │
│  - Validation (request data validation)                     │
│  - Rate limiting                                            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Controllers Layer                         │
│  - Handle HTTP requests/responses                           │
│  - Extract data from req object                             │
│  - Call appropriate service methods                         │
│  - Format and send responses                                │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     Services Layer                           │
│  - Contain ALL business logic                               │
│  - Implement algorithms (matching, discovery)               │
│  - Handle data validation and transformation                │
│  - Coordinate between multiple models                       │
│  - Manage transactions                                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      Models Layer                            │
│  - Define database schemas                                  │
│  - Provide database operations (CRUD)                       │
│  - Define relationships                                     │
│  - Schema validation                                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Database (MongoDB)                        │
└─────────────────────────────────────────────────────────────┘
```

## Request Flow Example

### Example: User Login

```javascript
// 1. Route Definition (routes/authRoutes.js)
router.post('/login', authLimiter, loginValidator, validate, authController.login);

// 2. Middleware Execution
// - authLimiter: Check rate limits
// - loginValidator: Validate email and password format
// - validate: Check validation results

// 3. Controller (controllers/authController.js)
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await AuthService.login(email, password);
  ApiResponse.success(res, 200, 'Login successful', result);
});

// 4. Service (services/AuthService.js)
async login(email, password) {
  // Find user
  const user = await User.findOne({ email }).select('+password');
  
  // Verify password
  const isValid = await user.comparePassword(password);
  
  // Generate tokens
  const tokens = JWTService.generateTokenPair({ id: user._id });
  
  // Update user
  user.refreshToken = tokens.refreshToken;
  await user.save();
  
  // Cache user
  await CacheService.set(`user:${user._id}`, user, 300);
  
  return { user, tokens };
}

// 5. Model (models/User.js)
// - Provides User.findOne() method
// - Provides comparePassword() method
// - Handles password hashing
```

## Component Responsibilities

### Routes (`src/routes/`)
**Responsibility**: Define API endpoints

```javascript
// ✅ Good - Routes only define paths and middleware
router.post('/login', authLimiter, loginValidator, validate, authController.login);
router.get('/users/:id', protect, userIdValidator, validate, userController.getUserProfile);

// ❌ Bad - Routes should not contain logic
router.post('/login', (req, res) => {
  // Don't put logic here!
});
```

### Controllers (`src/controllers/`)
**Responsibility**: Handle HTTP requests and responses

```javascript
// ✅ Good - Controller delegates to service
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await AuthService.login(email, password);
  ApiResponse.success(res, 200, 'Login successful', result);
});

// ❌ Bad - Controller contains business logic
exports.login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email });
  const isValid = await bcrypt.compare(password, user.password);
  // ... more logic
  // This should be in the service!
});
```

### Services (`src/services/`)
**Responsibility**: Contain ALL business logic

```javascript
// ✅ Good - Service contains all logic
class AuthService {
  async login(email, password) {
    // Validate input
    if (!email || !password) {
      throw new ValidationError('Email and password required');
    }
    
    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }
    
    // Verify password
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      throw new AuthenticationError('Invalid credentials');
    }
    
    // Generate tokens
    const tokens = JWTService.generateTokenPair({ id: user._id });
    
    // Update user
    user.refreshToken = tokens.refreshToken;
    await user.save();
    
    // Cache
    await CacheService.set(`user:${user._id}`, user, 300);
    
    return { user, tokens };
  }
}

// ❌ Bad - Service with HTTP concerns
class AuthService {
  async login(req, res) {  // ❌ Don't pass req/res to service
    // ❌ Don't send responses from service
    res.json({ success: true });
  }
}
```

### Models (`src/models/`)
**Responsibility**: Define data structure and database operations

```javascript
// ✅ Good - Model defines schema and data methods
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// ❌ Bad - Model contains business logic
userSchema.methods.login = async function(password) {
  // Business logic should be in service!
  const isValid = await this.comparePassword(password);
  const token = jwt.sign({ id: this._id }, secret);
  return { user: this, token };
};
```

## Benefits of This Architecture

### 1. Separation of Concerns
- **Controllers**: Only worry about HTTP
- **Services**: Only worry about business logic
- **Models**: Only worry about data

### 2. Reusability
```javascript
// Service can be called from multiple places
await AuthService.login(email, password);  // From controller
await AuthService.login(email, password);  // From another service
await AuthService.login(email, password);  // From CLI script
```

### 3. Testability
```javascript
// Easy to test service without HTTP
describe('AuthService', () => {
  it('should login user with valid credentials', async () => {
    const result = await AuthService.login('test@example.com', 'password');
    expect(result.user).toBeDefined();
    expect(result.tokens).toBeDefined();
  });
});
```

### 4. Maintainability
```javascript
// Change business logic without touching HTTP layer
// Modify AuthService.login() without changing authController.login()
```

### 5. Scalability
```javascript
// Services can be extracted to microservices
// AuthService → Auth Microservice
// UserService → User Microservice
// SwipeService → Matching Microservice
```

## Service Communication

### Services Can Call Other Services

```javascript
class SwipeService {
  async swipeUser(swiperId, swipedUserId, action) {
    // Create swipe
    const swipe = await Swipe.create({ swiperId, swipedUserId, action });
    
    // Check for match
    if (action === 'like') {
      const hasMatch = await this.checkForMatch(swiperId, swipedUserId);
      
      if (hasMatch) {
        // Call MatchService to create match
        const match = await MatchService.createMatch(swiperId, swipedUserId);
        
        // Call UserService to update stats
        await UserService.incrementMatchCount(swiperId);
        await UserService.incrementMatchCount(swipedUserId);
        
        return { swipe, match, isMatch: true };
      }
    }
    
    return { swipe, isMatch: false };
  }
}
```

## Error Handling

### Services Throw Errors, Controllers Catch Them

```javascript
// Service throws error
class AuthService {
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AuthenticationError('Invalid credentials');  // ✅ Throw
    }
    return { user, tokens };
  }
}

// Controller catches error (via asyncHandler)
exports.login = asyncHandler(async (req, res) => {
  const result = await AuthService.login(email, password);  // ✅ Catch
  ApiResponse.success(res, 200, 'Login successful', result);
});

// Error middleware handles the error
app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ success: false, message: err.message });
});
```

## Best Practices

### ✅ DO

1. **Keep controllers thin**
   ```javascript
   exports.login = asyncHandler(async (req, res) => {
     const result = await AuthService.login(req.body.email, req.body.password);
     ApiResponse.success(res, 200, 'Success', result);
   });
   ```

2. **Put all logic in services**
   ```javascript
   class AuthService {
     async login(email, password) {
       // All validation, business logic, data operations here
     }
   }
   ```

3. **Services return data, not responses**
   ```javascript
   return { user, tokens };  // ✅ Return data
   ```

4. **Use dependency injection for testability**
   ```javascript
   class UserService {
     constructor(userModel = User) {
       this.User = userModel;
     }
   }
   ```

### ❌ DON'T

1. **Don't put business logic in controllers**
   ```javascript
   // ❌ Bad
   exports.login = asyncHandler(async (req, res) => {
     const user = await User.findOne({ email: req.body.email });
     const isValid = await bcrypt.compare(req.body.password, user.password);
     // ... more logic
   });
   ```

2. **Don't pass req/res to services**
   ```javascript
   // ❌ Bad
   await AuthService.login(req, res);
   ```

3. **Don't send responses from services**
   ```javascript
   // ❌ Bad
   class AuthService {
     async login(email, password) {
       res.json({ success: true });  // ❌ Don't do this
     }
   }
   ```

4. **Don't put business logic in models**
   ```javascript
   // ❌ Bad
   userSchema.methods.login = async function(password) {
     // Business logic belongs in service!
   };
   ```

## Migration to Microservices

When your app grows, services can be extracted to microservices:

```
Monolith:
┌─────────────────────────────┐
│   Dating App Backend        │
│  ┌────────────────────────┐ │
│  │   AuthService          │ │
│  │   UserService          │ │
│  │   SwipeService         │ │
│  │   MatchService         │ │
│  └────────────────────────┘ │
└─────────────────────────────┘

Microservices:
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Auth Service │  │ User Service │  │ Match Service│
│              │  │              │  │              │
│ AuthService  │  │ UserService  │  │ SwipeService │
│              │  │              │  │ MatchService │
└──────────────┘  └──────────────┘  └──────────────┘
```

## Conclusion

The Service Layer Pattern provides:
- ✅ Clean separation of concerns
- ✅ Highly testable code
- ✅ Reusable business logic
- ✅ Easy to maintain and scale
- ✅ Ready for microservices migration

This architecture ensures your dating app can scale from 100 users to 10 million users without major refactoring.

