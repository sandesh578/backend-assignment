const express = require('express');
const router = express.Router();

// Import controller functions for authentication
const { registerUser, loginUser } = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: bca830fa-287a-42cc-8635-e1da3409b4fb
 *         username:
 *           type: string
 *           example: Sandesh Parajuli
 *         email:
 *           type: string
 *           format: email
 *           example: parajulisandesh578@gmail.com
 *     ServerErrorResponse:
 *        type: object
 *        properties:
 *          success:
 *            type: boolean
 *            example: false
 *          message:
 *            type: string
 *            example: Internal Server Error
 *
 */

// Register a new user
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username
 *                 minLength: 3
 *                 maxLength: 30
 *                 example: Sandesh Parajuli
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email address
 *                 example: parajulisandesh578@gmail.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 minLength: 6
 *                 maxLength: 16
 *                 pattern: '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$'
 *                 example: Sandesh@123
 *     responses:
 *       200:
 *         description: User registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User registered successfully.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User already exists
 *       500:
 *         description: User registration failed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */
router.post('/register', registerUser);

// User login

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
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
 *                 format: email
 *                 description: User email address
 *                 example: parajulisandesh578@gmail.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 minLength: 6
 *                 maxLength: 16
 *                 pattern: '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$'
 *                 example: Sandesh@123
 *     responses:
 *       200:
 *         description: User login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Logged in successfully.
 *                 accessToken:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request or incorrect credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User already exists.
 *       500:
 *         description: Password is incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */
router.post('/login', loginUser);

module.exports = router;
