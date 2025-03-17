const express = require('express');
const { createRide, getAllRides, getRideById, deleteRide, getMatchingRides, getMyRides } = require('../controllers/rideController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createRide);
router.get('/my-rides',authMiddleware,getMyRides);
router.get('/:id', getRideById);
router.delete('/:id', authMiddleware, deleteRide);
router.post("/match", authMiddleware, getMatchingRides);

module.exports = router;
