// Importing express
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const { connectDB } = require('./lib/db');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT || 8000;

// Initializing express
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Add additional routing
app.use('/auth', authRoutes);

// Default GET response
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Connect to Database and Start Express
connectDB().then((db) => {
    app.locals.db = db;

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}).catch(error => {
    console.error('Failed to connect to the database', error);
});