const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
    provider: String,
    token: String,
}, { _id: false });

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    profileImage: String,
    providers: { type: [ProviderSchema], required: true },
    role: { type: Array, default: ["user"] },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema, 'Users');

module.exports = User;
