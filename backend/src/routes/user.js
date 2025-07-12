const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getProfile, getMyItems, getMySwaps } = require('../controllers/userController');

router.get('/me', auth, getProfile);
router.get('/my-items', auth, getMyItems);
router.get('/my-swaps', auth, getMySwaps);

module.exports = router; 