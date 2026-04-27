const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const upload = require('../middleware/upload');

const { protect } = require('../middleware/authMiddleware');

router.post('/convert', protect, upload.single('image'), imageController.convert);

module.exports = router;
