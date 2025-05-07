// controllers/statsController.js
const { User } = require('../models');
const { fn, col, literal } = require('sequelize');

exports.getDailySignups = async (req, res) => {
  try {
    const dailySignups = await User.findAll({
      attributes: [
        // Group by date (YYYY-MM-DD) of creation
        [fn('DATE', col('createdAt')), 'date'],
        // Count of users for that date
        [fn('COUNT', col('id')), 'count']
      ],
      group: [literal('date')],            // group by the date alias
      order: [[literal('date'), 'ASC']],   // sort by date ascending
      raw: true                            // return raw JSON rather than Sequelize instances
    });
    res.json(dailySignups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch daily signups' });
  }
};
