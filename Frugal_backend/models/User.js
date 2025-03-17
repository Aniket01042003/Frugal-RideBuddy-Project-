const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    googleId: String,
    rating: { type: Number, default: 5 },
    reviews: [{ userId: mongoose.Schema.Types.ObjectId, comment: String }],
    createdAt: { type: Date, default: Date.now }
  });
const User = mongoose.model('User', userSchema);
module.exports = User;