const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "application_statuses",
    {
      applicationStatusId: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
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
          fields: ["applicationStatusId"],
        },
      ],
    }
  );
};
