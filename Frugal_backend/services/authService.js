const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (userData) => {
  const { name, email, password, phone } = userData;
  if (!name || !email || !password) {
    throw new Error('All fields are required');
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, phone });
  return { success: true, message: 'User registered successfully', token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }) };
};

exports.login = async (userData) => {
  const { email, password } = userData;
  if (!email || !password) {
    throw new Error('All fields are required');
  }
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token =  this.generateToken(user);
  return { token, user };
};

exports.generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, 
    process.env.JWT_SECRET, 
    { expiresIn: '7d' }
  )
};