module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    imageUrl: { type: DataTypes.STRING }
  });

  Product.associate = models => {
    Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
    Product.hasMany(models.CartItem, { foreignKey: 'productId', onDelete: 'CASCADE' });
    Product.hasMany(models.OrderItem, { foreignKey: 'productId' });
  };

  return Product;
};
