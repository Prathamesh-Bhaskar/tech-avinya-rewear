const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

// Auth routes
app.use('/api/auth', require('./routes/auth'));
// User dashboard routes
app.use('/api/users', require('./routes/user'));
// Item management routes
app.use('/api/items', require('./routes/item'));
// Swap and points system routes
app.use('/api/swaps', require('./routes/swap'));
// Admin panel routes
app.use('/api/admin', require('./routes/admin'));

// Routes
app.get('/', (req, res) => {
    res.send('🌍 Welcome to the API');
});

module.exports = app;
