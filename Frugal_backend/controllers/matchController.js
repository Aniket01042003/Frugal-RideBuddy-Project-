const MatchService = require('../services/matchService');

exports.requestMatch = async (req, res) => {
  try {
    const match = await MatchService.requestMatch(req.user.id, req.body.rideId, req.body.matchedUsers);
    res.status(201).json(match);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMatchRequests = async (req, res) => {
  try {
    const matches = await MatchService.getMatchRequests(req.user.id);
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getRidesByUserController = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming auth middleware sets req.user

    const rides = await MatchService.getRidesByUserService(userId);

    res.status(200).json({
      message: "Rides fetched successfully!",
      rides,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Failed to fetch rides.",
    });
  }
};


// exports.updateMatchStatus = async (req, res) => {
//   try {
//     const match = await MatchService.updateMatchStatus(req.params.id, req.body.status);
//     if (!match) return res.status(404).json({ message: 'Match not found' });
//     res.status(200).json(match);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.updateMatchStatus = async (req, res) => {
  try {
    const rideId = req.params.id
    console.log("rf",req.params);
    const match = await MatchService.updateMatchStatus(rideId, req.user.id);

    res.status(200).json({
      message: "Ride confirmed successfully!",
      match,
    });

  } catch (error) {
    res.status(400).json({
      message: error.message || "Failed to confirm ride.",
    });
  }
};
