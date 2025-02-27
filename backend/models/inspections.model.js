const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "inspections",
    {
      inspectionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      inspectorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "inspectors",
          key: "inspectorId",
        },
      },
      applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "applications",
          key: "applicationId",
        },
      },
      inspectionDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      result: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["inspectionId"],
        },
      ],
    }
  );
};
