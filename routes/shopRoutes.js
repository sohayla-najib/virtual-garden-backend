const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  getCategories,
  createProductWithImage
} = require('../controllers/productController');

const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
} = require('../controllers/cartController');

const {
  checkout,
  getOrders,
  getAllOrders
} = require('../controllers/orderController');

const upload = require('../middleware/uploadMiddleware');

// Public Product Routes
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.get('/categories', getCategories);

// ✅ Public route to create a product (no authMiddleware)
router.post('/products', upload.single('image'), createProductWithImage);

// Cart Routes (still protected)
const authMiddleware = require('../middleware/authMiddleware');
router.get('/cart', authMiddleware, getCart);
router.post('/cart', authMiddleware, addToCart);
router.put('/cart/:itemId', authMiddleware, updateCartItem);
router.delete('/cart/:itemId', authMiddleware, removeCartItem);

// Orders
router.post('/checkout', authMiddleware, checkout);
router.get('/orders', authMiddleware, getOrders);
router.get('/allorders', getAllOrders); 
module.exports = router;
