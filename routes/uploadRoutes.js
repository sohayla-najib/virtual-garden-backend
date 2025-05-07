const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { uploadProductImage } = require('../controllers/uploadController');

router.post('/upload', upload.single('image'), uploadProductImage);
module.exports = router;
