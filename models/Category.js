// models/Category.js
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: { type: DataTypes.TEXT }
    });
  
    Category.associate = models => {
      Category.hasMany(models.Product, { foreignKey: 'categoryId', onDelete: 'SET NULL' });
    };
  
    return Category;
  };
  