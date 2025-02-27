const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "roles",
    {
      roleId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["roleId"],
        },
      ],
    }
  );
};
