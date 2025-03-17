const mongoose = require('mongoose');
const matchSchema = new mongoose.Schema({
    rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride' },
    matchedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createUsers: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'confirmed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
  });
const Match = mongoose.model('Match', matchSchema);
module.exports = Match;