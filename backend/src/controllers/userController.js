const User = require('../models/User');
const Item = require('../models/Item');
const Swap = require('../models/Swap');

// Get user profile and points
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get user's uploaded items
const getMyItems = async (req, res) => {
    try {
        const items = await Item.find({ uploader: req.user.id });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get user's swaps (as requester or owner)
const getMySwaps = async (req, res) => {
    try {
        const swaps = await Swap.find({ $or: [ { requester: req.user.id }, { owner: req.user.id } ] })
            .populate('item')
            .populate('requester', 'name email')
            .populate('owner', 'name email');
        res.json(swaps);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { getProfile, getMyItems, getMySwaps }; 