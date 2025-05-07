// routes/stats.js
const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const auth = require('../middleware/auth');  // authentication middleware

// Dashboard Stats Endpoints
router.get('/stats/daily-signups', auth, statsController.getDailySignups);
router.get('/stats/weekly-orders', auth, statsController.getWeeklyOrders);
router.get('/stats/revenue-trends', auth, statsController.getRevenueTrends);
router.get('/stats/popular-products', auth, statsController.getPopularProducts);

module.exports = router;
