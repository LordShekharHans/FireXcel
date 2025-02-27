const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Inspector = sequelize.define(
    "inspectors",
    {
      inspectorId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "userId",
        },
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      assignedAdminId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "admins",
          key: "adminId",
        },
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["inspectorId"],
        },
      ],
    }
  );
  return Inspector;
};