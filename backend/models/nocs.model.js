const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "nocs",
    {
      nocId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "applications",
          key: "applicationId",
        },
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["nocId"],
        },
      ],
    }
  );
};
