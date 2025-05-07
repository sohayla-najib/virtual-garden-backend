const { CartItem, Product } = require('../models');

// Get all items in the current user's cart
exports.getCart = async (req, res, next) => {
  try {
    const items = await CartItem.findAll({ 
      where: { userId: req.user.id },
      include: [{ model: Product, attributes: ['id', 'name', 'price', 'imageUrl'] }]
    });
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

// Add an item to the cart or increase quantity if it already exists
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let item = await CartItem.findOne({ where: { userId, productId } });

    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = await CartItem.create({ userId, productId, quantity });
    }

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

// Update quantity of a specific item in the cart
exports.updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    const [updatedRows] = await CartItem.update(
      { quantity },
      {
        where: {
          id: req.params.itemId,
          userId: req.user.id
        }
      }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Cart item not found or not authorized" });
    }

    res.json({ message: "Cart item updated" });
  } catch (err) {
    next(err);
  }
};

// Remove an item from the cart
exports.removeCartItem = async (req, res, next) => {
  try {
    const deleted = await CartItem.destroy({
      where: {
        id: req.params.itemId,
        userId: req.user.id
      }
    });

    if (deleted === 0) {
      return res.status(404).json({ message: "Item not found or not authorized" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    next(err);
  }
};
