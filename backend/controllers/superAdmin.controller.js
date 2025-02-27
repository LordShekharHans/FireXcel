const db = require("../models");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../services/emailServices");

module.exports = {
    //view all applications
    viewAllApplications: async (req, res) => {
        try {
            const allApplications = await db.applications.findAll();

            res.status(200).json(allApplications);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    //Delete an application
    deleteApplication: async (req, res) => {
        const { id } = req.params;

        try {
            const application = await db.applications.findByPk(id);
            const application_form = await db.application_forms.findOne({applicationId:id});

            if (!application) {
                return res.status(404).json({ message: "Application not found" });
            }

            await application.destroy();
            await application_form.destroy();

            res.status(200).json({ message: "Application deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    //create superadmin account
    createSuperAdmin: async (req, res) => {
        const { name, email, password, region } = req.body;

        try {
            const existingUser = await db.users.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "User with this email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // update in users
            const user = await db.users.create({
                name,
                email,
                password: hashedPassword,
                roleId: 1, // Role ID for SUPERADMIN
            });

            // update in superadmins
            await db.superadmins.create({
                userId: user.userId,
                region,
            });

            res.status(201).json({ message: "SuperAdmin account created successfully", user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    //Create admin account
    createAdmin: async (req, res) => {
        try {
            const { name, email, password, region, assignedSuperAdminId } = req.body;

            if (!name || !email || !password || !region) {
                return res.status(400).json({ message: "All fields are required." });
            }

            const existingUser = await db.users.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use." });
            }

            // entry in users 
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await db.users.create({
                name,
                email,
                password: hashedPassword,
                roleId: 2, // Role ID for ADMIN
            });

            // entry in admins
            const newAdmin = await db.admins.create({
                userId: newUser.userId,
                region,
                assignedSuperAdminId: assignedSuperAdminId || null,
            });

            return res.status(201).json({
                message: "Admin account created successfully.",
                admin: newAdmin,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // create inspector account
    createInspector: async (req, res) => {
        try {
            const { name, email, password, region, assignedAdminId } = req.body;

            if (!name || !email || !password || !region) {
                return res.status(400).json({ message: "All fields are required." });
            }

            const existingUser = await db.users.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use." });
            }

            // entry in users
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await db.users.create({
                name,
                email,
                password: hashedPassword,
                roleId: 3, // Role ID for INSPECTOR
            });

            // entry in inspectors
            const newInspector = await db.inspectors.create({
                userId: newUser.userId,
                region,
                assignedAdminId: assignedAdminId || null,
            });

            return res.status(201).json({
                message: "Inspector account created successfully.",
                inspector: newInspector,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },
    // Delete a superadmin
    deleteSuperAdmin: async (req, res) => {
        const { id } = req.params;

        try {
            const superAdmin = await db.superadmins.findByPk(id);
            if (!superAdmin) {
                return res.status(404).json({ message: "SuperAdmin not found" });
            }

            await db.users.destroy({ where: { userId: superAdmin.userId } });
            await superAdmin.destroy();

            res.status(200).json({ message: "SuperAdmin deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // Delete an admin
    deleteAdmin: async (req, res) => {
        const { id } = req.params;

        try {
            const admin = await db.admins.findByPk(id);
            if (!admin) {
                return res.status(404).json({ message: "Admin not found" });
            }

            await db.users.destroy({ where: { userId: admin.userId } });
            await admin.destroy();

            res.status(200).json({ message: "Admin deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // Delete an inspector
    deleteInspector: async (req, res) => {
        const { id } = req.params;

        try {
            const inspector = await db.inspectors.findByPk(id);
            if (!inspector) {
                return res.status(404).json({ message: "Inspector not found" });
            }

            await db.users.destroy({ where: { userId: inspector.userId } });
            await inspector.destroy();

            res.status(200).json({ message: "Inspector deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // Fetch all admins
    getAllAdmins: async (req, res) => {
        try {
            const admins = await db.admins.findAll();

            res.status(200).json(admins);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // Fetch inspectors by assignedAdminId
    getInspectorsByAdmin: async (req, res) => {
        const { assignedAdminId } = req.params;

        try {
            const inspectors = await db.inspectors.findAll({
                where: { assignedAdminId },
            });

            res.status(200).json(inspectors);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // Update assignedAdminId of an inspector
    updateInspectorAdmin: async (req, res) => {
        const { id } = req.params; // Inspector ID
        const { assignedAdminId } = req.body;
        try {
            const inspector = await db.inspectors.findByPk(id);
            if (!inspector) {
                return res.status(404).json({ message: "Inspector not found" });
            }
            inspector.assignedAdminId = assignedAdminId;
            await inspector.save();
            const admin = await db.admins.findOne({ where: { adminId: assignedAdminId } });
            const adminUser = await db.users.findOne({ where: { userId: admin.userId } });
            const inspectorUser = await db.users.findOne({ where: { userId: inspector.userId } });

            if (!adminUser || !inspectorUser) {
                return res.status(404).json({ message: "User details not found" });
            }

            // Send email to the inspector
            await sendEmail(
                inspectorUser.email,
                "Admin Assignment Updated",
                `
                    <p>Dear ${inspectorUser.name},</p>
                    <p>Your assigned admin has been updated to ${adminUser.name}.</p>
                    <p>Please coordinate accordingly.</p>
                    <p>Best Regards,<br/>Fire Department Monitoring Team</p>
                `
            );

            // Send email to the admin
            await sendEmail(
                adminUser.email,
                "Inspector Assigned to You",
                `
                    <p>Dear ${adminUser.name},</p>
                    <p>Inspector ${inspectorUser.name} has been assigned to you.</p>
                    <p>Please coordinate accordingly.</p>
                    <p>Best Regards,<br/>Fire Department Monitoring Team</p>
                `
            );

            res.status(200).json({
                message: "Inspector's assignedAdminId updated successfully and notifications sent.",
                inspector,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // Fetch inspectors without assigned admins
    getInspectorsWithoutAdmins: async (req, res) => {
        try {
            const inspectors = await db.inspectors.findAll({
                where: { assignedAdminId: null },
            });

            res.status(200).json(inspectors);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // Fetch all NOCs
    getAllNOCs: async (req, res) => {
        try {
            const nocs = await db.nocs.findAll();

            res.status(200).json(nocs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // Fetch particular admin details
    fetchAdminDetails: async (req, res) => {
        const { adminId } = req.params; // Get adminId from request parameters

        try {
            // Fetch admin details
            const adminDetails = await db.admins.findOne({
                where: { adminId }, // Filter by adminId
                attributes: ['adminId', 'userId', 'region', 'assignedSuperAdminId'], // Exclude unnecessary fields
            });

            if (!adminDetails) {
                return res.status(404).json({
                    success: false,
                    message: 'Admin not found',
                });
            }

            // Fetch user details using userId from the fetched admin details
            const userDetails = await db.users.findOne({
                where: { userId: adminDetails.userId }, // Filter by userId
                attributes: ['name', 'email', 'roleId'], // Exclude password
            });

            if (!userDetails) {
                return res.status(404).json({
                    success: false,
                    message: 'User associated with the admin not found',
                });
            }

            // Combine admin and user details in the response
            const combinedDetails = {
                ...userDetails.dataValues,
                ...adminDetails.dataValues,
            };

            // Respond with the combined details
            return res.status(200).json({
                success: true,
                data: combinedDetails,
            });
        } catch (error) {
            console.error('Error fetching admin details:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while fetching admin details',
                error: error.message,
            });
        }
    },
    // Fetch particular admin details
    fetchInspectorDetails: async (req, res) => {
        const { inspectorId } = req.params; // Get adminId from request parameters

        try {
            // Fetch admin details
            const isnpectorDetails = await db.inspectors.findOne({
                where: { inspectorId }, // Filter by adminId
                attributes: ['inspectorId', 'userId', 'region', 'assignedAdminId'], // Exclude unnecessary fields
            });

            if (!isnpectorDetails) {
                return res.status(404).json({
                    success: false,
                    message: 'Inspector not found',
                });
            }

            // Fetch user details using userId from the fetched inspector details
            const userDetails = await db.users.findOne({
                where: { userId: isnpectorDetails.userId }, // Filter by userId
                attributes: ['name', 'email', 'roleId'], // Exclude password
            });

            if (!userDetails) {
                return res.status(404).json({
                    success: false,
                    message: 'User associated with the inspector not found',
                });
            }

            // Combine admin and user details in the response
            const combinedDetails = {
                ...userDetails.dataValues,
                ...isnpectorDetails.dataValues,
            };

            // Respond with the combined details
            return res.status(200).json({
                success: true,
                data: combinedDetails,
            });
        } catch (error) {
            console.error('Error fetching admin details:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while fetching admin details',
                error: error.message,
            });
        }
    },


    // Fetch an application details
    fetchApplicationDetails: async (req, res) => {
        const { applicationId } = req.params; // Extract applicationId from the request parameters

        try {
            // Fetch the application details from the applications model
            const applicationDetails = await db.applications.findOne({
                where: { applicationId },
                attributes: ['applicationId', 'userId', 'inspectionId', 'applicationStatusId'], // Specify necessary fields
            });

            if (!applicationDetails) {
                return res.status(404).json({
                    success: false,
                    message: 'Application not found',
                });
            }
            return res.status(200).json({
                success: true,
                data: {
                    applicationDetails
                },
            });
        } catch (error) {
            console.error('Error fetching application details:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while fetching application details',
                error: error.message,
            });
        }
    },
    // // Fetch all NOCs grouped by divisions
    // nocsByDivisions: async (req, res) => {
    //     try {
    //         // Fetch NOCs and include application forms to access divisions
    //         const nocs = await db.nocs.findAll({
    //             include: [
    //                 {
    //                     model: db.application_forms,
    //                     attributes: ['division'], // Fetch only the division field
    //                 },
    //             ],
    //         });

    //         // Group NOCs by divisions
    //         const groupedNOCs = nocs.reduce((acc, noc) => {
    //             const division = noc.application_form?.division || 'UNKNOWN'; // Default to 'UNKNOWN' if division is null
    //             if (!acc[division]) acc[division] = [];
    //             acc[division].push(noc);
    //             return acc;
    //         }, {});

    //         res.status(200).json(groupedNOCs);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: "Internal Server Error" });
    //     }
    // },


};