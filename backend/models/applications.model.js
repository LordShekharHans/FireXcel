const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "applications",
    {
      applicationId: {
        type: DataTypes.SMALLINT,
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
      inspectionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      applicationStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "application_statuses",
          key: "applicationStatusId",
        },
      },
      priority: {
        type: DataTypes.ENUM("LOW", "DEFAULT", "HIGH", "URGENT"),
        allowNull: false,
        defaultValue: "DEFAULT",
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["applicationId"],
        },
      ],
    }
  );
};
