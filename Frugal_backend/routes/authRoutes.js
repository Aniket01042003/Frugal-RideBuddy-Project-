const express = require('express');
const { signup, login} = require('../controllers/authController');
const passport = require('passport');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'}),
    (req, res) => {
        const token = req.user.token; 
        // console.log(req.user)
        res.redirect(`http://localhost:5173/profile?token=${token}`);
    }
)
    

module.exports = router;
