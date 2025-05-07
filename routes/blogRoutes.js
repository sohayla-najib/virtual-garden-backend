const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blogController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/multer'); // Add multer

// Public routes
router.get('/', BlogController.getAllBlogs);
router.get('/:id', BlogController.getBlogById);

// Protected routes with image upload
router.post('/', auth, upload.single('image'), BlogController.createBlog);

module.exports = router;
