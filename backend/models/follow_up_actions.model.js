const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "follow_up_actions",
    {
      follow_up_actionId: {
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
      actionType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      actionDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
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
          fields: ["follow_up_actionId"],
        },
      ],
    }
  );
};
