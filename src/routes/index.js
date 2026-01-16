const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const swipeRoutes = require('./swipeRoutes');
const matchRoutes = require('./matchRoutes');
const filterRoutes = require('./filterRoutes');
const contentRoutes = require('./contentRoutes');
const configRoutes = require('./configRoutes');
const appConfigRoutes = require('./appConfigRoutes');

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/swipes', swipeRoutes);
router.use('/matches', matchRoutes);
router.use('/filters', filterRoutes);
router.use('/content', contentRoutes);
router.use('/config', configRoutes);
router.use('/app-config', appConfigRoutes);

module.exports = router;

