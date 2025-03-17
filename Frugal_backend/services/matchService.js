const Match = require('../models/Match');
const Ride = require('../models/Ride');
const User = require('../models/User');


exports.requestMatch = async (userId, rideId, matchedUsers) => {
    const ride = await Ride.findById(rideId);
    if (!ride) throw new Error('Ride not found');

    if (!matchedUsers || !matchedUsers.length) throw new Error('No users selected for matching');

    return await Match.create({ rideId, matchedUsers, status: 'pending' });
};

exports.getMatchRequests = async (userId) => {
  try {
    const matches = await Match.find()
      .populate({
        path: 'rideId',
        select: 'source destination travel_date time ride_status'
      })
      .populate({
        path: 'matchedUsers',
        select: 'name rating reviews'
      });

    if (!matches || matches.length === 0) {
      return [];
    }

    // Format the matches safely
    return matches.map(match => ({
      _id: match._id,
      ride: match.rideId ? {
        source: match.rideId.source || { name: "Unknown", coordinates: [] },
        destination: match.rideId.destination || { name: "Unknown", coordinates: [] },
        travel_date: match.rideId.travel_date || "Unknown",
        time: match.rideId.time || "Unknown",
        ride_status: match.rideId.ride_status || "Unknown"
      } : null,  // If `rideId` is null, return `null`
      matchedUsers: match.matchedUsers ? match.matchedUsers.map(user => ({
        _id: user._id,
        name: user.name || "Unknown",
        rating: user.rating || 0,
        reviews: user.reviews || []
      })) : [],
      status: match.status || "Unknown",
      createdAt: match.createdAt || new Date()
    }));
  } catch (error) {
    throw new Error("Error fetching matches: " + error.message);
  }
};

// exports.updateMatchStatus = async (matchId, status) => {
//     return await Match.findByIdAndUpdate(matchId, { status }, { new: true });
// };

exports.getRidesByUserService = async (userId) => {
  try {
    const matches = await Match.find({
      $or: [{ createUsers: userId }, { matchedUsers: userId }],
    })
      .populate({
        path: "rideId",
        model: "Ride",
      })
      .populate({
        path: "createUsers",
        model: "User",
        select: "name email phone rating reviews", // Fetch additional creator details
      })
      .populate({
        path: "matchedUsers",
        model: "User",
        select: "name email phone rating reviews", // Fetch additional matched user details
      });

    // Transform response
    const rides = matches.map((match) => ({
      rideId: match.rideId._id,
      creator: {
        id: match.createUsers._id,
        name: match.createUsers.name,
        email: match.createUsers.email,
        phone: match.createUsers.phone,
        rating: match.createUsers.rating,
        reviews: match.createUsers.reviews,
      },
      source: match.rideId.source,
      destination: match.rideId.destination,
      matchedUsers: match.matchedUsers.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        rating: user.rating,
        reviews: user.reviews,
      })),
      travel_date: match.rideId.travel_date,
      time: match.rideId.time,
      status: match.status,
    }));

    return rides;
  } catch (error) {
    throw new Error(error.message || "Error fetching rides");
  }
};





exports.updateMatchStatus = async (rideId, userId) => {
  try {
    console.log(rideId);
    const ride = await Ride.findById(rideId);
    console.log("ride from ", ride);
    if (!ride) {
      throw new Error("Ride not found");
    }
    let match = await Match.findOne({ rideId });

    if (!match) {
      match = new Match({
        rideId,
        matchedUsers: [userId], // Add user to matchedUsers array
        createUsers: ride.userId, // Add user to matchedUsers array
        status: "confirmed",
      });
    } else {
      // Update existing match by adding the user
      if (!match.matchedUsers.includes(userId)) {
        match.matchedUsers.push(userId);
      }
      match.status = "confirmed";
    }
    await match.save();

    // ride.ride_status = "matched";
    await ride.save();

    return match;
  } catch (error) {
    throw new Error(error.message || "Error confirming ride");
  }
};
