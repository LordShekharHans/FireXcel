const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "permissions",
    {
      permissionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      permissionName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["permissionId"],
        },
      ],
    }
  );
};
