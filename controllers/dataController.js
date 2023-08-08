const express = require('express');
const jwt = require('jsonwebtoken');
const Data = require('../models/Data');
require('dotenv').config();

const router = express.Router();

// Middleware to verify access token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({
                status: 'error',
                code: 'INVALID_TOKEN',
                message: 'Invalid access token provided.',
            });
        }
        req.userId = user.userId;
        next();
    });
};

// Store Data
router.post('/data', authenticateToken, async (req, res) => {
    try {
        const { key, value } = req.body;

        // Check if key and value are provided
        if (!key) {
            return res.status(400).json({
                status: 'error',
                code: 'INVALID_KEY',
                message: 'The provided key is not valid or missing.',
            });
        }

        if (!value) {
            return res.status(400).json({
                status: 'error',
                code: 'INVALID_VALUE',
                message: 'The provided value is not valid or missing.',
            });
        }

        // Check if key already exists
        const existingData = await Data.findOne({ where: { key } });
        if (existingData) {
            return res.status(400).json({
                status: 'error',
                code: 'KEY_EXISTS',
                message: 'The provided key already exists in the database. To update an existing key, use the update API.',
            });
        }

        const data = await Data.create({ key, value });

        res.status(201).json({
            status: 'success',
            message: 'Data stored successfully.',
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Retrieve Data
router.get('/data/:key', authenticateToken, async (req, res) => {
    try {
        const key = req.params.key;

        // Retrieve data from the database
        const data = await Data.findOne({ where: { key } });

        if (!data) {
            return res.status(404).json({
                status: 'error',
                code: 'KEY_NOT_FOUND',
                message: 'The provided key does not exist in the database.',
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                key: data.key,
                value: data.value,
            },
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update Data
router.put('/data/:key', authenticateToken, async (req, res) => {
    try {
        const key = req.params.key;
        const { value } = req.body;

        // Retrieve data from the database
        const data = await Data.findOne({ where: { key } });

        if (!data) {
            return res.status(404).json({
                status: 'error',
                code: 'KEY_NOT_FOUND',
                message: 'The provided key does not exist in the database.',
            });
        }

        // Update the data value
        data.value = value;
        await data.save();

        res.status(200).json({
            status: 'success',
            message: 'Data updated successfully.',
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete Data
router.delete('/data/:key', authenticateToken, async (req, res) => {
    try {
        const key = req.params.key;

        // Retrieve data from the database
        const data = await Data.findOne({ where: { key } });

        if (!data) {
            return res.status(404).json({
                status: 'error',
                code: 'KEY_NOT_FOUND',
                message: 'The provided key does not exist in the database.',
            });
        }

        // Delete the data
        await data.destroy();

        res.status(200).json({
            status: 'success',
            message: 'Data deleted successfully.',
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;