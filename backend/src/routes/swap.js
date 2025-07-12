const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { requestSwap, redeemItem, getSwapById } = require('../controllers/swapController');

router.post('/request', auth, requestSwap);
router.post('/redeem', auth, redeemItem);
router.get('/:id', auth, getSwapById);

module.exports = router; 