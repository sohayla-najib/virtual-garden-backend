// models/CartItem.js
module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
      quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
    });
  
    CartItem.associate = models => {
      CartItem.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      CartItem.belongsTo(models.Product, { foreignKey: 'productId' });
    };
  
    return CartItem;
  };
  