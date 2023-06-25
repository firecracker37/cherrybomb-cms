const express = require('express');
const User = require ('../models/userModel');
const UserValidatorSchema = require('../validators/userValidatorSchema');
const bcrypt = require('bcrypt');
const { createJWT, getUserFromToken, destroyJWT } = require('../utils/utils')
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const db = req.app.locals.db;

    try {
        const { error } = UserValidatorSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Check that the request contains the required fields
        const { email, password, name } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({ message: 'A user with that email address already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = new User({
            email,
            name,
            providers: [
                {
                    provider: 'local',
                    token: hashedPassword
                }
            ],
        });

        const savedUser = await newUser.save();
        
        const userResponse = {
            _id: savedUser._id,
            email: savedUser.email,
            name: savedUser.name,
            profileImage: savedUser.profileImage,
        };

        // Create a JWT
        const token = createJWT(savedUser._id);

        // Set the JWT in a cookie
        res.cookie('token', token, { httpOnly: true });

        res.status(201).json({ user: userResponse });

    } catch (error) {
        console.error('Failed to register user:', error);
        res.status(500).json({ message: 'Failed to register user.' });
    }
});

router.post('/login', async (req, res) => {
    const db = req.app.locals.db;
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        // Fetch the user from the database
        const user = await User.findOne({ email });

        // If no user found, return error
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        //Compare the passwords
        const localProvider = user.providers.find(provider => provider.provider === 'local');
        const isMatch = await bcrypt.compare(password, localProvider.token);

        // If password doesn't match, return error
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const userResponse = {
            _id: user._id,
            email: user.email,
            name: user.name,
            profileImage: user.profileImage,
        };

        // Create a JWT
        const token = createJWT(user._id);

        // Set the JWT in a cookie
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ user: userResponse });


    } catch (error) {
        console.error('Failed to login user:', error);
        res.status(500).json({ message: 'Failed to login user.' });
    }
});

router.post('/logout', (req, res) => {
    try {
        // Call the destroyJWT function to unset the JWT
        destroyJWT(res);

        // Send a success response
        res.status(200).json({ message: 'Logged out successfully.' });
    } catch (error) {
        console.error('Failed to logout user:', error);
        res.status(500).json({ message: 'Failed to logout user.' });
    }
});

router.get('/profile', async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(403).json({ message: 'Not authenticated' });
        }

        const user = await getUserFromToken(token);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
        
    } catch (error) {
        console.error('Failed to retrieve profile:', error);
        res.status(500).json({ message: 'Failed to retrieve profile.' });
    }
});

// router.put('/profile', async (req, res) => {
//     try {
//         const [email, password, name] = req.body;

//         const token = req.cookies.token;
        
//         if(!token) return res.status(403).json({ message: 'Not authorized' });

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const userId = decoded.id

//     } catch (error) {
//         console.error('Failed to update user:', error);
//         res.status(500).json({message: 'Failed to update user.' });
//     }
// })

module.exports = router;
