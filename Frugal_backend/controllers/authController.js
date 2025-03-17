const AuthService = require('../services/authService');

exports.signup = async (req, res) => {
  try {
    const user = await AuthService.signup(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const userRes = await AuthService.login(req.body);
    res.status(200).json({ userRes });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
