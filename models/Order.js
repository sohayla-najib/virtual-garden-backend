module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {

    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "COD",
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: "customerId" });
  };

  return Order;
};
