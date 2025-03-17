const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes.js');
const rideRoutes = require('./routes/rideRoutes.js');
const matchRoutes = require('./routes/matchRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
require('./config/passport'); 

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(session({
    secret: process.env.SESSION_SECRET || 'dfkdjhbvkjfbvlkdjvbfdjknvldjvbdjkbndkjhvbdkjhvbldbldbiohrgoirhowgpwiergpwghidfoinlfnvirhgwpigh', // Use environment variable or a default value
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/matches', matchRoutes);

app.get('/', (req, res) => res.send('Frugal RideBuddy API Running'));

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
