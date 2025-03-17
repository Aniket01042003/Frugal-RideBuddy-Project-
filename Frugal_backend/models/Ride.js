const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    source: { name: String, coordinates: { type: [Number], index: '2dsphere' } },
    destination: { name: String, coordinates: { type: [Number], index: '2dsphere' } },
    travel_date: Date,
    time: String,
    ride_status: { type: String, enum: ['pending', 'matched', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
  });
const Ride = mongoose.model('Ride', rideSchema);
module.exports = Ride;