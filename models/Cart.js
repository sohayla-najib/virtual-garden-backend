// models/Cart.js
module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
      // For simplicity, we treat Cart as an abstract concept owned by a User.
      status: { type: DataTypes.STRING, defaultValue: 'open' } // could be 'open', 'ordered', 'completed'
    });
  
    Cart.associate = models => {
      Cart.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      // If needed, Cart.hasMany(models.CartItem);
    };
  
    return Cart;
  };
  