const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "application_renewals",
    {
      applicationRenewalId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      applicationId: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        references: {
          model: "applications",
          key: "applicationId",
        },
      },
      nocId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "nocs",
          key: "nocId",
        },
      },
      kForm: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jForm: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["applicationRenewalId"],
        },
      ],
    }
  );
};
