// models/OrderItem.js
module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
      quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
      price: { type: DataTypes.DECIMAL(10,2), allowNull: false }  // price at time of order
    });
  
    OrderItem.associate = models => {
      OrderItem.belongsTo(models.Order, { foreignKey: 'orderId', onDelete: 'CASCADE' });
      OrderItem.belongsTo(models.Product, { foreignKey: 'productId' });
    };
  
    return OrderItem;
  };
  