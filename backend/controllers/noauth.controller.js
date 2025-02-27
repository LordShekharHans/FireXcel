const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const emailnotify = require("../services/emailServices"); // Import Email Service

module.exports = {
    // Create controller to call a simple function
    verifyLand: async (req, res) => {
        try {
            await emailnotify.sendLandAuthorityEmail();
            res.status(200).send({
                success: true,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    },
};
