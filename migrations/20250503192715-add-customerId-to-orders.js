'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Orders", "customerId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // 👈 must match your actual Users table name
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Orders", "customerId");
  }
};
