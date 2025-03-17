const User = require('../models/User');

exports.getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.error('Error fetching user:', error.message);
        throw new Error('Failed to retrieve user');
    }
};

exports.updateUser = async (userId, userData) => {
    try {
        // Prevent updating the password directly without hashing
        if (userData.password) {
            throw new Error('Use a password update endpoint');
        }

        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true, runValidators: true });
        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error.message);
        throw new Error('Failed to update user');
    }
};
