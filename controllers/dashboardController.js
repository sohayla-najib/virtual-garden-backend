// controllers/dashboard.controller.js
const { User, Order, OrderItem, Product, Blog } = require('../models');
const { fn, col, literal } = require('sequelize');

// ✅ Overall dashboard metrics
exports.getDashboardMetrics = async (req, res, next) => {
  try {
    const userCount = await User.count();
    const blogCount = await Blog.count();
    const orderCount = await Order.count();
    // const orders = await Order.findAll({ attributes: ['totalAmount'] });


    res.json({
      userCount,
      blogCount,
      orderCount,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Daily user signups
exports.getDailySignups = async (req, res, next) => {
  try {
    const signups = await User.findAll({
      attributes: [
        [fn('DATE', col('createdAt')), 'date'],
        [fn('COUNT', col('id')), 'count']
      ],
      group: [literal('date')],
      order: [[literal('date'), 'ASC']],
      raw: true
    });
    res.json(signups);
  } catch (err) {
    next(err);
  }
};

// ✅ Weekly orders
exports.getWeeklyOrders = async (req, res, next) => {
  try {
    const weeklyOrders = await Order.findAll({
      attributes: [
        [fn('YEAR', col('createdAt')), 'year'],
        [fn('WEEK', col('createdAt')), 'week'],
        [fn('COUNT', col('id')), 'orderCount']
      ],
      group: ['year', 'week'],
      order: [
        [literal('year'), 'ASC'],
        [literal('week'), 'ASC']
      ],
      raw: true
    });
    res.json(weeklyOrders);
  } catch (err) {
    next(err);
  }
};

// ✅ Revenue trends (daily)
exports.getRevenueTrends = async (req, res, next) => {
  try {
    const revenueTrends = await Order.findAll({
      attributes: [
        [fn('DATE', col('createdAt')), 'date'],
        // [fn('SUM', col('totalAmount')), 'totalRevenue']
      ],
      group: [literal('date')],
      order: [[literal('date'), 'ASC']],
      raw: true
    });
    res.json(revenueTrends);
  } catch (err) {
    next(err);
  }
};

// ✅ Popular products (top 5 by order frequency)
exports.getPopularProducts = async (req, res, next) => {
  try {
    const popularProducts = await OrderItem.findAll({
      attributes: [
        'productId',
        [fn('COUNT', col('productId')), 'count']
      ],
      include: {
        model: Product,
        attributes: ['name']
      },
      group: ['productId', 'Product.id'],
      order: [[literal('count'), 'DESC']],
      limit: 5,
      raw: true,
      nest: true
    });
    res.json(popularProducts);
  } catch (err) {
    next(err);
  }
};
