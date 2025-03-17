const UserService = require('../services/userService.js');

exports.getUserProfile = async (req, res) => {
    try {
        console.log("req",req)
        const user = await UserService.getUserById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateUser  = async (req, res) => {
    try {
        const updatedUser  = await UserService.updateUser (req.user.id, req.body);
        res.status(200).json(updatedUser );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};