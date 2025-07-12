const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const { getPendingItems, approveItem, rejectItem, removeItem, getUsers, banUser } = require('../controllers/adminController');

router.get('/items/pending', auth, role('admin'), getPendingItems);
router.put('/items/:id/approve', auth, role('admin'), approveItem);
router.put('/items/:id/reject', auth, role('admin'), rejectItem);
router.delete('/items/:id', auth, role('admin'), removeItem);
router.get('/users', auth, role('admin'), getUsers);
router.put('/users/:id/ban', auth, role('admin'), banUser);

module.exports = router; 