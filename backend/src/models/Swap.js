const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['swap', 'points'], required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
    pointsUsed: { type: Number },
    messages: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        timestamp: { type: Date, default: Date.now }
    }],
}, { timestamps: true });

module.exports = mongoose.model('Swap', swapSchema); 