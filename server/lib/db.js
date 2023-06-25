const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_CONN, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB with Mongoose");
    } catch (error) {
        console.error('Failed to connect to the database', error);
        throw error;
    }
}

module.exports = { connectDB };
