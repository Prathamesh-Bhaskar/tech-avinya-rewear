const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: String }],
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: String },
    condition: { type: String },
    tags: [{ type: String }],
    status: { type: String, enum: ['available', 'swapped', 'pending', 'removed'], default: 'pending' },
    approved: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema); 