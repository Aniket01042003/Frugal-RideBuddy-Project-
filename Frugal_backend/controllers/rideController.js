const RideService = require('../services/rideService');

exports.createRide = async (req, res) => {
  try {
    const ride = await RideService.createRide(req.body, req.user.id);
    res.status(201).json(ride);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllRides = async (req, res) => {
  try {
    const rides = await RideService.getAllRides();
    res.status(200).json(rides);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMyRides = async (req, res) => {
  try { // Assuming user ID is available in req.user
    console.log(req.user.id)
    const rides = await RideService.getAllRidesByUser(req.user.id); // Fetch only the user's rides
    res.status(200).json(rides);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRideById = async (req, res) => {
  try {
    const ride = await RideService.getRideById(req.params.id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRide = async (req, res) => {
  try {
    const response = await RideService.deleteRide(req.params.id, req.user.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMatchingRides = async (req, res) => {
  try {
    const { source, destination } = req.body;

    if (!source || !destination || !source.coordinates || !destination.coordinates) {
      return res.status(400).json({ message: "Source and destination with coordinates are required" });
    }

    const matchingRides = await RideService.findMatchingRides(source.coordinates, destination.coordinates);

    res.status(200).json(matchingRides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

