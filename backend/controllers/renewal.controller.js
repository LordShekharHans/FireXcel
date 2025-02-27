const db = require("../models");
const bcrypt = require("bcrypt");

module.exports = {

    createApplicationRenewal: async (req, res) => {
        try {
            const {
                nocId,
                kForm,
                jForm
            } = req.body; // Extract data from request body

            // Validate the required fields
            if (!kForm || !jForm || !nocId) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required."
                });
            }
            // Fetch the applicationId from the nocs table using nocId
            const nocRecord = await db.nocs.findOne({
                where: { nocId },
                attributes: ['applicationId']
            });

            if (!nocRecord) {
                return res.status(404).json({
                    success: false,
                    message: "No record found for the provided nocId."
                });
            }

            const applicationId = nocRecord.applicationId;

            // Create the application renewal record
            const applicationRenewal = await db.application_renewals.create({
                applicationId,
                nocId,
                kForm,
                jForm
            });

            return res.status(201).json({
                success: true,
                message: "Application renewal created successfully.",
                data: applicationRenewal
            });
        } catch (error) {
            console.error("Error creating application renewal:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred while creating the application renewal.",
                error: error.message
            });
        }
    },

    getAllApplicationRenewals: async (req, res) => {
        try {
            const applicationRenewals = await db.application_renewals.findAll();

            if (!applicationRenewals || applicationRenewals.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No application renewals found."
                });
            }

            return res.status(200).json(applicationRenewals);
        } catch (error) {
            console.error("Error retrieving application renewals:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred while retrieving application renewals.",
                error: error.message
            });
        }
    },

    updateNOC: async (req, res) => {
        const { nocId } = req.params;

        try {
            // Fetch the NOC to ensure it exists
            const noc = await db.nocs.findOne({
                where: { nocId },
            });

            if (!noc) {
                return res.status(404).json({
                    success: false,
                    message: "NOC not found."
                });
            }

            // Fetch the associated application to check its status
            const application = await db.applications.findOne({
                where: { applicationId: noc.applicationId },
            });

            if (!application) {
                return res.status(404).json({
                    success: false,
                    message: "Application not found for the provided NOC."
                });
            }

            // Check if the applicationStatusId is 11
            if (application.applicationStatusId !== 11) {
                return res.status(400).json({
                    success: false,
                    message: "NOC can only be updated for applications with status ID 11."
                });
            }

            // Update the expiresAt field to updatedAt + 3 years
            let updatedExpiresAt = new Date(noc.updatedAt);
            updatedExpiresAt.setFullYear(updatedExpiresAt.getFullYear() + 3);

            await db.nocs.update(
                { expiresAt: updatedExpiresAt },
                { where: { nocId } }
            );

            return res.status(200).json({
                success: true,
                message: "NOC updated successfully.",
                noc: {
                    nocId,
                    applicationId: noc.applicationId,
                    expiresAt: updatedExpiresAt,
                },
            });
        } catch (error) {
            console.error("Error updating NOC:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred while updating the NOC.",
                error: error.message,
            });
        }
    },

};
