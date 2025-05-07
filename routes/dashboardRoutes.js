// routes/dashboard.routes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/authMiddleware'); // 👈 use "auth" for consistency

// General dashboard metrics (protected)
router.get('/', auth, dashboardController.getDashboardMetrics);

// Aggregated endpoints
router.get('/daily-signups', auth, dashboardController.getDailySignups);
router.get('/weekly-orders', auth, dashboardController.getWeeklyOrders);
router.get('/revenue-trends', auth, dashboardController.getRevenueTrends);
router.get('/popular-products', auth, dashboardController.getPopularProducts);

module.exports = router;
