module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define(
    'Blog',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'Blogs',       // Optional: explicit table name
      timestamps: true,         // Adds createdAt and updatedAt
    }
  );

  Blog.associate = (models) => {
    Blog.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
    });
  };

  return Blog;
};
