const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const SuperAdmin = sequelize.define(
        "superadmins",
        {
            superadminId: {
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
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ["superadminId"],
                },
            ],
        }
    );
    return SuperAdmin;
};
