const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, full_name, age, gender } = req.body;

        // Check if required fields are provided
        if (!username || !email || !password || !full_name) {
            return res.status(400).json({
                status: 'error',
                code: 'INVALID_REQUEST',
                message: 'Invalid request. Please provide all required fields: username, email, password, full_name.',
            });
        }

        // Check if the username or email already exists
        const existingUser = await User.findOne({ where: { username } });
        const existingEmail = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                code: 'USERNAME_EXISTS',
                message: 'The provided username is already taken. Please choose a different username.',
            });
        }

        if (existingEmail) {
            return res.status(400).json({
                status: 'error',
                code: 'EMAIL_EXISTS',
                message: 'The provided email is already registered. Please use a different email address.',
            });
        }

        // Check password requirements
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/;
        if (!password.match(passwordRegex)) {
            return res.status(400).json({
                status: 'error',
                code: 'INVALID_PASSWORD',
                message: 'The provided password does not meet the requirements.',
            });
        }

        // Check age
        if (!Number.isInteger(age) || age <= 0) {
            return res.status(400).json({
                status: 'error',
                code: 'INVALID_AGE',
                message: 'Invalid age value. Age must be a positive integer.',
            });
        }

        // Check gender
        if (!gender) {
            return res.status(400).json({
                status: 'error',
                code: 'GENDER_REQUIRED',
                message: 'Gender field is required. Please specify the gender (e.g., male, female, non-binary).',
            });
        }
        const user = await User.create({ username, email, password, full_name, age, gender });

        res.status(201).json({
            status: 'success',
            message: 'User successfully registered!',
            data: {
                user_id: user.id,
                username: user.username,
                email: user.email,
                full_name: user.full_name,
                age: user.age,
                gender: user.gender,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 'INTERNAL_SERVER_ERROR',
            message: 'An internal server error occurred. Please try again later.',
        });
    }
});

// Generate Token
router.post('/token', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if both username and password are provided
        if (!username || !password) {
            return res.status(400).json({
                status: 'error',
                code: 'MISSING_FIELDS',
                message: 'Missing fields. Please provide both username and password.',
            });
        }

        // Check if the user exists in the database
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({
                status: 'error',
                code: 'INVALID_CREDENTIALS',
                message: 'Invalid credentials. The provided username or password is incorrect.',
            });
        }

        // Verify the password
        if (user.password !== password) {
            return res.status(401).json({
                status: 'error',
                code: 'INVALID_CREDENTIALS',
                message: 'Invalid credentials. The provided username or password is incorrect.',
            });
        }

        // Generate and send the access token
        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            status: 'success',
            message: 'Access token generated successfully.',
            data: {
                access_token: accessToken,
                expires_in: 3600,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 'INTERNAL_ERROR',
            message: 'Internal server error occurred. Please try again later.',
        });
    }
});

module.exports = router;