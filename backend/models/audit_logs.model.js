const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "audit_logs",
    {
      audit_logId: {
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
      recordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recordType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["audit_logId"],
        },
      ],
    }
  );
};
