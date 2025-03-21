const express = require('express');

const { getUserProfile, updateUser } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile);
router.put('/update', authMiddleware, updateUser);

module.exports = router;
