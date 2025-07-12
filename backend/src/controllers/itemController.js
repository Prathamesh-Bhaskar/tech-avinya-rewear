const Item = require('../models/Item');
const User = require('../models/User');

// Add new item
const addItem = async (req, res) => {
    try {
        const { images, title, description, category, type, size, condition, tags } = req.body;
        const item = await Item.create({
            uploader: req.user.id,
            images,
            title,
            description,
            category,
            type,
            size,
            condition,
            tags,
            status: 'pending',
            approved: false
        });
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get all items (optionally filter by approved/featured/category)
const getItems = async (req, res) => {
    try {
        const filter = { approved: true };
        if (req.query.category) filter.category = req.query.category;
        if (req.query.featured) filter.featured = true;
        const items = await Item.find(filter).populate('uploader', 'name email');
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get featured items
const getFeaturedItems = async (req, res) => {
    try {
        const items = await Item.find({ approved: true, featured: true }).populate('uploader', 'name email');
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get item by ID
const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('uploader', 'name email');
        if (!item || !item.approved) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update item (owner or admin)
const updateItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        if (item.uploader.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        Object.assign(item, req.body);
        await item.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete item (owner or admin)
const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        if (item.uploader.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        await item.remove();
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { addItem, getItems, getFeaturedItems, getItemById, updateItem, deleteItem }; 