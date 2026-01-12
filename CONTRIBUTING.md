# Contributing to Dating App Backend

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing](#testing)
8. [Documentation](#documentation)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- MongoDB >= 5.0
- Git
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/dating-app-backend.git
   cd dating-app-backend
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/dating-app-backend.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Setup environment**
   ```bash
   cp .env.example .env
   # Edit .env with your local configuration
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming Convention

- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/critical-fix` - Critical production fixes
- `refactor/what-is-refactored` - Code refactoring
- `docs/what-is-documented` - Documentation updates

### Workflow Steps

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow coding standards
   - Add tests for new features
   - Update documentation

3. **Test your changes**
   ```bash
   npm test
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add user profile photo upload"
   ```

5. **Keep your branch updated**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Fill in the PR template

## Coding Standards

### JavaScript Style Guide

We follow the Airbnb JavaScript Style Guide with some modifications.

#### General Rules

1. **Use ES6+ features**
   ```javascript
   // Good
   const user = await User.findById(id);
   
   // Bad
   var user = User.findById(id).then(...)
   ```

2. **Use async/await over promises**
   ```javascript
   // Good
   const result = await someAsyncFunction();
   
   // Bad
   someAsyncFunction().then(result => ...)
   ```

3. **Use arrow functions**
   ```javascript
   // Good
   const add = (a, b) => a + b;
   
   // Bad
   function add(a, b) { return a + b; }
   ```

4. **Use template literals**
   ```javascript
   // Good
   const message = `Hello ${name}`;
   
   // Bad
   const message = 'Hello ' + name;
   ```

5. **Use destructuring**
   ```javascript
   // Good
   const { firstName, lastName } = user;
   
   // Bad
   const firstName = user.firstName;
   const lastName = user.lastName;
   ```

#### Naming Conventions

- **Variables & Functions**: camelCase
  ```javascript
  const userName = 'John';
  function getUserProfile() {}
  ```

- **Classes & Models**: PascalCase
  ```javascript
  class UserService {}
  const User = mongoose.model('User');
  ```

- **Constants**: UPPER_SNAKE_CASE
  ```javascript
  const MAX_LOGIN_ATTEMPTS = 5;
  ```

- **Private functions**: _camelCase
  ```javascript
  function _privateHelper() {}
  ```

#### File Structure

```javascript
// 1. Imports
const express = require('express');
const { User } = require('../models');

// 2. Constants
const MAX_RESULTS = 100;

// 3. Helper functions
const formatUser = (user) => { ... };

// 4. Main exports
exports.getUser = asyncHandler(async (req, res) => {
  // Implementation
});
```

#### Error Handling

```javascript
// Always use asyncHandler for async routes
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  ApiResponse.success(res, 200, 'User retrieved', { user });
});
```

#### Comments

```javascript
/**
 * Get user profile by ID
 * @param {String} userId - User ID
 * @returns {Object} User profile
 */
async function getUserProfile(userId) {
  // Implementation
}
```

### ESLint

Run ESLint before committing:

```bash
npm run lint
npm run lint:fix
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/).

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
feat(auth): add password reset functionality

Implemented password reset via email with token verification.
Tokens expire after 1 hour.

Closes #123
```

```bash
fix(swipe): prevent duplicate swipes on same user

Added unique compound index on swiperId and swipedUserId
to prevent duplicate swipe records.

Fixes #456
```

```bash
docs(api): update authentication endpoints documentation

Added examples for all auth endpoints and error responses.
```

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] Branch is up to date with main

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process

1. At least one approval required
2. All CI checks must pass
3. No merge conflicts
4. Code review comments addressed

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

```javascript
describe('User Controller', () => {
  describe('GET /users/:id', () => {
    it('should return user profile', async () => {
      const res = await request(app)
        .get('/api/v1/users/123')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toBeDefined();
    });
    
    it('should return 404 for non-existent user', async () => {
      const res = await request(app)
        .get('/api/v1/users/invalid-id')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
      
      expect(res.body.success).toBe(false);
    });
  });
});
```

## Documentation

### Code Documentation

- Add JSDoc comments for functions
- Explain complex logic
- Document API endpoints
- Update README for new features

### API Documentation

Update `API_DOCUMENTATION.md` when:
- Adding new endpoints
- Changing request/response format
- Adding new query parameters
- Changing authentication requirements

### README Updates

Update `README.md` when:
- Adding new features
- Changing setup process
- Adding new dependencies
- Updating deployment process

## Questions?

- Open an issue for bugs
- Start a discussion for questions
- Contact maintainers directly

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing! 🎉

