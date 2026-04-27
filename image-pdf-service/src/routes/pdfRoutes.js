const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware');

router.post('/from-images', protect, upload.array('images'), pdfController.fromImages);
router.post('/to-images', protect, upload.single('pdf'), pdfController.toImages);
router.post('/to-word', protect, upload.single('pdf'), pdfController.toWord);
router.post('/merge', protect, upload.array('pdfs'), pdfController.merge);


module.exports = router;
