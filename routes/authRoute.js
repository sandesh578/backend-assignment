const express = require('express');
const router = express.Router();

// Import controller functions for authentication
const { registerUser, loginUser } = require('../controllers/authController');

// Register a new user
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

module.exports = router;
