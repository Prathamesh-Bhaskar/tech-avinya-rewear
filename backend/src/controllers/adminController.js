const Item = require('../models/Item');
const User = require('../models/User');

// List pending items
const getPendingItems = async (req, res) => {
    try {
        const items = await Item.find({ approved: false, status: 'pending' }).populate('uploader', 'name email');
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Approve item
const approveItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        item.approved = true;
        item.status = 'available';
        await item.save();
        res.json({ message: 'Item approved', item });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Reject item
const rejectItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        item.approved = false;
        item.status = 'removed';
        await item.save();
        res.json({ message: 'Item rejected', item });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Remove item
const removeItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        await item.remove();
        res.json({ message: 'Item removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// List users
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Ban user
const banUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.isBanned = true;
        await user.save();
        res.json({ message: 'User banned', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { getPendingItems, approveItem, rejectItem, removeItem, getUsers, banUser }; 