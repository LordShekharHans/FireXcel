const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Admin = sequelize.define(
        "admins",
        {
            adminId: {
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
            assignedSuperAdminId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "superadmins",
                    key: "superadminId",
                },
            },
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ["adminId"],
                },
            ],
        }
        
    );
    
    return Admin;
};
