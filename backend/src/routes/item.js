const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { addItem, getItems, getFeaturedItems, getItemById, updateItem, deleteItem } = require('../controllers/itemController');
const upload = require('../middlewares/upload');
const { uploadToCloudinary } = require('../utils/cloudinary');
const fs = require('fs');

// Public
router.get('/', getItems);
router.get('/featured', getFeaturedItems);
router.get('/:id', getItemById);

// Protected
router.post('/', auth, addItem);
router.put('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);

// Image upload endpoint
router.post('/upload', upload.array('images', 5), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    const uploadPromises = files.map(file => uploadToCloudinary(file.path));
    const results = await Promise.all(uploadPromises);
    // Remove local files after upload
    files.forEach(file => {
      try {
        fs.unlinkSync(file.path);
      } catch (err) {
        console.warn('Failed to delete file:', file.path, err.message);
      }
    });
    const urls = results.map(r => r.secure_url);
    res.json({ urls });
  } catch (err) {
    res.status(500).json({ message: 'Image upload failed', error: err.message });
  }
});

module.exports = router; 