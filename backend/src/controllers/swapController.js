const Swap = require('../models/Swap');
const Item = require('../models/Item');
const User = require('../models/User');

// Request a swap
const requestSwap = async (req, res) => {
    try {
        const { itemId } = req.body;
        const item = await Item.findById(itemId);
        if (!item || !item.approved || item.status !== 'available') {
            return res.status(400).json({ message: 'Item not available for swap' });
        }
        if (item.uploader.toString() === req.user.id) {
            return res.status(400).json({ message: 'Cannot swap your own item' });
        }
        const swap = await Swap.create({
            item: itemId,
            requester: req.user.id,
            owner: item.uploader,
            type: 'swap',
            status: 'pending'
        });
        item.status = 'pending';
        await item.save();
        res.status(201).json(swap);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Redeem item via points
const redeemItem = async (req, res) => {
    try {
        const { itemId } = req.body;
        const item = await Item.findById(itemId);
        if (!item || !item.approved || item.status !== 'available') {
            return res.status(400).json({ message: 'Item not available for redemption' });
        }
        if (item.uploader.toString() === req.user.id) {
            return res.status(400).json({ message: 'Cannot redeem your own item' });
        }
        const user = await User.findById(req.user.id);
        const pointsRequired = 10; // Example: each item costs 10 points
        if (user.points < pointsRequired) {
            return res.status(400).json({ message: 'Not enough points' });
        }
        user.points -= pointsRequired;
        await user.save();
        const swap = await Swap.create({
            item: itemId,
            requester: req.user.id,
            owner: item.uploader,
            type: 'points',
            status: 'pending',
            pointsUsed: pointsRequired
        });
        item.status = 'pending';
        await item.save();
        res.status(201).json(swap);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get swap details
const getSwapById = async (req, res) => {
    try {
        const swap = await Swap.findById(req.params.id)
            .populate('item')
            .populate('requester', 'name email')
            .populate('owner', 'name email');
        if (!swap) return res.status(404).json({ message: 'Swap not found' });
        if (swap.requester.toString() !== req.user.id && swap.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        res.json(swap);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { requestSwap, redeemItem, getSwapById }; 