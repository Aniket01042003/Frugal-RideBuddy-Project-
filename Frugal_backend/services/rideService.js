const Ride = require('../models/Ride');

exports.createRide = async (rideData, userId) => {
  rideData.userId = userId;
  return await Ride.create(rideData);
};

// exports.getAllRides = async () => {
//   return await Ride.find();
// };

exports.getAllRidesByUser = async (userId) => {
  const data = await Ride.find({ userId: userId });
  console.log(data)
  return data;
};


exports.getRideById = async (id) => {
  return await Ride.findById(id).populate('userId', 'name email phone');
};

exports.deleteRide = async (rideId, userId) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error('Ride not found');
  
  if (ride.userId.toString() !== userId) throw new Error('Unauthorized');

  await Ride.findByIdAndDelete(rideId);
  return { message: 'Ride deleted successfully' };
};

exports.findMatchingRides = async (sourceCoords, destCoords) => {
  try {
    console.log(sourceCoords, " ", destCoords);

    return await Ride.find({
      $or: [
        {
          "source.coordinates": {
            $geoWithin: {
              $centerSphere: [sourceCoords, 1 / 6378.1], // 1km radius
            },
          },
        },
        {
          "destination.coordinates": {
            $geoWithin: {
              $centerSphere: [destCoords, 1 / 6378.1], // 1km radius
            },
          },
        },
      ],
    }).populate("userId", "name rating reviews");

  } catch (error) {
    throw new Error("Error fetching matching rides: " + error.message);
  }
};
