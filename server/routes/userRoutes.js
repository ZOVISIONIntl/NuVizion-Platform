const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { register, login, getProfile } = require('../controllers/authController');

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Get current user profile
router.get('/me', auth, getProfile);

module.exports = router;
 