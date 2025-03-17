const express = require('express');
const { requestMatch, updateMatchStatus, getRidesByUserController } = require('../controllers/matchController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, requestMatch);
router.get('/', authMiddleware, getRidesByUserController);
router.put('/:id', authMiddleware, updateMatchStatus);

module.exports = router;
