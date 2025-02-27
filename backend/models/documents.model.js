const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "documents",
    {
      documentId: {
        type: DataTypes.STRING,
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
      documentType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      documentPath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["documentId"],
        },
      ],
    }
  );
};
