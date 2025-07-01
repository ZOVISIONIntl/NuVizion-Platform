const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Get user profile (protected)
router.get('/me', auth, getUserProfile);

module.exports = router;
