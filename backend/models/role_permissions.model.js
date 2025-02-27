const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "role_permissions",
    {
      role_permissionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "roleId",
        },
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "permissions",
          key: "permissionId",
        },
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["role_permissionId"],
        },
      ],
    }
  );
};
