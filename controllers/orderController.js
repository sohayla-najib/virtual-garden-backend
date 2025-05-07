const { Order } = require('../models'); // ✅ This gives you the Sequelize model

// Checkout (place order)
exports.checkout = async (req, res) => {
  try {
    const { customerId, paymentMethod, deliveryAddress, orderItems } = req.body;
    const method = paymentMethod || 'COD';

    const order = await Order.create({
      customerId,
      paymentMethod: method,
      status: method === 'COD' ? 'pending' : 'processing',
      deliveryAddress,
      // You can add orderItems handling logic here if necessary
    });

    res.status(201).json({
      message: "Order placed successfully with Cash on Delivery",
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders for a user (for example)
exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming auth middleware sets req.user
    const orders = await Order.findAll({ where: { customerId: userId } });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll(); // No filter
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


