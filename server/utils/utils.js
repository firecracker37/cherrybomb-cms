const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

function createJWT(user_id) {
    const payload = {
        id: user_id,
    };
    
    // Create the JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
    return token;
};

async function getUserFromToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findById(userId).select('-providers -__v');

        return user;

    } catch (error) {
        // Log error or throw it to be handled by the caller
        console.error('Failed to get user from token:', error);
        return null;
    }
}

function destroyJWT(res) {
    // Set an HTTP-only cookie with the expired token
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false, // set secure flag in production environment
        expires: new Date(0), // this date is in the past, so the cookie will immediately expire
        sameSite: 'Strict'
    });
};

module.exports = { createJWT, getUserFromToken, destroyJWT };
