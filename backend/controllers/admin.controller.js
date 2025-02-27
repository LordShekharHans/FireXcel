const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const emailnotify = require("../services/emailServices"); // Import Email Service

module.exports = {
  // Create an inspector
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

      // Entry in users with transaction
      const { newUser, newInspector } = await db.sequelize.transaction(async (t) => {
        const newUser = await db.users.create(
          {
            name,
            email,
            password: await bcrypt.hash(password, 10),
            roleId: 3, // Role ID for INSPECTOR
          },
          { transaction: t }
        );

        // Entry in inspectors
        const newInspector = await db.inspectors.create(
          {
            userId: newUser.userId,
            region,
            assignedAdminId: assignedAdminId || null,
          },
          { transaction: t }
        );

        return { newUser, newInspector };
      });

      // Fetch inspector's user details
      const inspectorUser = await db.users.findOne({
        where: { userId: newInspector.userId },
      });

      // Send real-time notification to the assigned admin (if any)
      if (assignedAdminId) {
        const assignedAdmin = await db.admins.findOne({
          where: { adminId: assignedAdminId },
          include: [{ model: db.users, as: 'user' }],
        });

        if (assignedAdmin && assignedAdmin.user) {

          // Email notification to Admin
          await emailnotify.sendInspectorCreatedEmail(
            assignedAdmin.user.email,
            assignedAdmin.user.name,
            inspectorUser.name,
            inspectorUser.email
          );
        }
      }

      return res.status(201).json({
        message: "Inspector account created successfully.",
        user: {
          userId: newUser.userId,
          name: newUser.name,
          email: newUser.email,
          inspector: newInspector,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Release an inspector
  releaseInspector: async (req, res) => {
    const { inspectorId } = req.params;

    try {
      // Fetch the inspector to ensure it exists
      const inspector = await db.inspectors.findOne({
        where: { inspectorId },
        include: [{ model: db.users, as: 'user' }],
      });

      if (!inspector) {
        return res.status(404).json({ message: "Inspector not found." });
      }

      // Release the inspector
      await db.inspectors.update(
        { assignedAdminId: null },
        { where: { inspectorId } }
      );

      // Notify the inspector about the release via real-time and email
      // if (inspector.user) {

      // }

      res.status(200).json({ message: "Inspector released successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Create an inspection
  createInspection: async (req, res) => {
    try {
      const { applicationId, inspectorId, inspectionDate } = req.body;

      // Validate the input
      if (!applicationId || !inspectorId || !inspectionDate) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Fetch the application to check if an inspection is already linked
      const application = await db.applications.findOne({
        where: { applicationId },
        include: [{ model: db.users, as: 'user' }],
      });

      if (!application) {
        return res.status(404).json({ error: "Application not found." });
      }

      // Check if an inspection already exists by verifying inspectionId
      if (application.inspectionId) {
        return res
          .status(400)
          .json({ error: "Inspection for this application already exists." });
      }

      // Fetch inspector details
      const inspector = await db.inspectors.findOne({
        where: { inspectorId },
        include: [{ model: db.users, as: 'user' }],
      });

      if (!inspector) {
        return res.status(404).json({ error: "Inspector not found." });
      }

      // Create the new inspection
      const newInspection = await db.inspections.create({
        applicationId,
        inspectorId,
        inspectionDate,
        result: "FSC APPLIED",
      });

      // Update the application with the new inspection and status
      await db.applications.update(
        { inspectionId: newInspection.inspectionId, applicationStatusId: 6 },
        { where: { applicationId } }
      );

      // Notify the inspector via real-time and email
      if (inspector.user) {

        // Email notification to Inspector
        await emailnotify.sendInspectionAssignedEmail(
          inspector.user.email,
          inspector.user.name,
          newInspection.inspectionId,
          applicationId,
          inspectionDate
        );
      }

      // Notify the user via real-time and email
      if (application.user) {

        // Email notification to User
        await emailnotify.sendInspectionAssignedToUserEmail(
          application.user.email,
          application.user.name,
          newInspection.inspectionId,
          inspectionDate
        );
      }

      res.status(201).json({
        message: "Inspection created and linked to application successfully.",
        inspection: newInspection,
      });
    } catch (error) {
      console.error("Error creating inspection:", error);
      res.status(500).json({
        error: "An error occurred while creating the inspection.",
      });
    }
  },

  // View all applications
  viewAllApplications: async (req, res) => {
    try {
      const allApplications = await db.applications.findAll();

      res.status(200).json(allApplications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Fetch an application details
  fetchApplicationDetails: async (req, res) => {
    const { applicationId } = req.params;

    try {
      // Fetch the application details from the applications model
      const applicationDetails = await db.applications.findOne({
        where: { applicationId },
        attributes: [
          "applicationId",
          "userId",
          "inspectionId",
          "applicationStatusId",
        ], // Specify necessary fields
      });

      if (!applicationDetails) {
        return res.status(404).json({
          success: false,
          message: "Application not found",
        });
      }
      return res.status(200).json(applicationDetails);
    } catch (error) {
      console.error("Error fetching application details:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching application details",
        error: error.message,
      });
    }
  },

  // Get all inspectors under this admin
  getInspectors: async (req, res) => {
    const userId = req.user.userId;
    // console.log(userId);

    try {
      // Find the admin by userId
      const admin = await db.admins.findOne({ where: { userId } });

      // Check if the admin exists
      if (!admin) {
        return res.status(404).json({ message: "Admin not found." });
      }

      // Find all inspectors under this admin
      const allInspectors = await db.users.findAll({
        include: {
          model: db.inspectors,
          as: "inspector",
          where: { assignedAdminId: admin.adminId },
        },
        where: { roleId: 3 },
        attributes: { exclude: ["password"] },
      });

      res.status(200).json(allInspectors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Update an existing inspection
  updateInspection: async (req, res) => {
    try {
      const { inspectionId } = req.params; // Get inspection ID from URL parameters
      const { inspectionDate, inspectorId, result } = req.body; // Get updated values from request body

      // Validate the input
      if (!inspectionId) {
        return res.status(400).json({ error: "Inspection ID is required." });
      }

      // Fetch the inspection to ensure it exists
      const inspection = await db.inspections.findOne({
        where: { inspectionId },
        include: [
          {
            model: db.inspectors,
            as: "inspector",
            include: [{ model: db.users, as: 'user' }],
          },
          {
            model: db.applications,
            as: "application",
            include: [{ model: db.users, as: 'user' }],
          },
        ],
      });

      if (!inspection) {
        return res.status(404).json({ error: "Inspection not found." });
      }

      // Prepare an object with fields to be updated
      const updates = {};
      if (inspectionDate) updates.inspectionDate = inspectionDate;
      if (inspectorId) updates.inspectorId = inspectorId;
      if (result) updates.result = result;

      // Ensure there's something to update
      if (Object.keys(updates).length === 0) {
        return res
          .status(400)
          .json({ error: "No valid fields provided for update." });
      }

      // Update the inspection
      await db.inspections.update(updates, { where: { inspectionId } });

      // Fetch the updated inspection
      const updatedInspection = await db.inspections.findOne({
        where: { inspectionId },
        include: [
          {
            model: db.inspectors,
            as: "inspector",
            include: [{ model: db.users, as: 'user' }],
          },
          {
            model: db.applications,
            as: "application",
            include: [{ model: db.users, as: 'user' }],
          },
        ],
      });

      // If inspector is changed, notify the new inspector
      if (inspectorId) {
        const newInspector = updatedInspection.inspector;
        if (newInspector && newInspector.user) {

          // Email notification to New Inspector
          await emailnotify.sendInspectionAssignedEmail(
            newInspector.user.email,
            newInspector.user.name,
            updatedInspection.inspectionId,
            updatedInspection.applicationId,
            updatedInspection.inspectionDate
          );
        }
      }

      // Notify the user about the inspection update
      const user = updatedInspection.application.user;
      if (user) {

        // Email notification to User about the update
        await emailnotify.sendApplicationStatusUpdate(
          user.email,
          user.name,
          updatedInspection.applicationId,
          'Updated'
        );
      }

      res.status(200).json({
        message: "Inspection updated successfully.",
        inspection: updatedInspection,
      });
    } catch (error) {
      console.error("Error updating inspection:", error);
      res.status(500).json({
        error: "An error occurred while updating the inspection.",
      });
    }
  },

  /**
   * Helper function to schedule weekly notifications starting one month before NOC expiration
   * @param {number} nocId - ID of the NOC
   * @param {Date} expiresAt - Expiration date of the NOC
   * @param {object} user - User object associated with the NOC
   */
  scheduleNOCExpirationNotifications: (nocId, expiresAt, user) => {
    const expirationDate = new Date(expiresAt);
    const notificationStartDate = new Date(expirationDate);
    notificationStartDate.setMonth(notificationStartDate.getMonth() - 1); // Start one month before expiration

    const now = new Date();
    const timeUntilStart = notificationStartDate.getTime() - now.getTime();

    if (timeUntilStart <= 0) {
      // If start date is in the past, start immediately
      module.exports.initiateWeeklyNotifications(nocId, expirationDate, user);
    } else {
      // Schedule to start one month before expiration
      setTimeout(() => {
        module.exports.initiateWeeklyNotifications(nocId, expirationDate, user);
      }, timeUntilStart);
    }

    console.log(`Scheduled notifications for NOC (ID: ${nocId}) starting on ${notificationStartDate.toDateString()}.`);
  },

  /**
   * Helper function to initiate weekly notifications using node-cron
   * @param {number} nocId - ID of the NOC
   * @param {Date} expirationDate - Expiration date of the NOC
   * @param {object} user - User object associated with the NOC
   */
  initiateWeeklyNotifications: (nocId, expirationDate, user) => {
    // Schedule a cron job to run every Monday at 9:00 AM
    const task = cron.schedule('0 9 * * 1', async () => {
      const now = new Date();

      if (now > expirationDate) {
        // Stop the notifications after expiration
        task.stop();
        console.log(`Stopped notifications for NOC (ID: ${nocId}) as it has expired.`);
        return;
      }

      // Construct the notification message
      const message = `Your NOC (ID: ${nocId}) is set to expire on ${expirationDate.toDateString()}. Please renew before the expiration date.`;

      try {

        // Email notification
        await emailnotify.sendNocStatusUpdate(
          user.email,
          user.name,
          nocId,
          'Expiring Soon'
        );

        console.log(`Sent weekly expiration reminder for NOC (ID: ${nocId}) to user (ID: ${user.userId}).`);
      } catch (error) {
        console.error(`Error sending expiration reminder for NOC (ID: ${nocId}):`, error);
      }
    });

    task.start();
    console.log(`Initiated weekly notifications for NOC (ID: ${nocId}).`);
  },

  // Generate NOC
  generateNOC: async (req, res) => {
    const { applicationId } = req.params; // Get application ID from request params

    try {
      // Fetch the application to ensure it exists and has the correct status
      const application = await db.applications.findOne({
        where: { applicationId },
        include: [{ model: db.users, as: 'user' }],
      });

      if (!application) {
        return res.status(404).json({ error: "Application not found." });
      }

      // Check if the applicationStatusId is 8 (Approved)
      if (application.applicationStatusId !== 8) {
        return res.status(400).json({
          error:
            "NOC can only be generated for applications with status NOC APPROVED.",
        });
      }

      // Check if a NOC already exists for this application
      const existingNOC = await db.nocs.findOne({
        where: { applicationId },
      });

      if (existingNOC) {
        // Update the expiresAt field of the existing NOC
        const updatedExpiresAt = new Date(existingNOC.updatedAt);
        updatedExpiresAt.setFullYear(updatedExpiresAt.getFullYear() + 3);

        await db.nocs.update(
          { expiresAt: updatedExpiresAt },
          { where: { nocId: existingNOC.nocId } }
        );

        // Schedule expiration notifications
        module.exports.scheduleNOCExpirationNotifications(existingNOC.nocId, updatedExpiresAt, application.user);

        // Notify the user about the NOC update via real-time and email
        if (application.user) {

          // Email notification to User about NOC update
          await emailnotify.sendNocStatusUpdate(
            application.user.email,
            application.user.name,
            existingNOC.nocId,
            'Updated'
          );
        }

        return res.status(200).json({
          message: "NOC updated successfully.",
          noc: {
            nocId: existingNOC.nocId,
            applicationId,
            expiresAt: updatedExpiresAt,
          },
        });
      }

      // Create a new NOC
      const createdNOC = await db.nocs.create({
        applicationId,
        expiresAt: new Date(
          new Date().setFullYear(new Date().getFullYear() + 3)
        ),
      });

      // Schedule expiration notifications
      module.exports.scheduleNOCExpirationNotifications(createdNOC.nocId, createdNOC.expiresAt, application.user);

      // Notify the user about the NOC generation via real-time and email
      if (application.user) {

        // Email notification to User about NOC generation
        await emailnotify.sendNocStatusUpdate(
          application.user.email,
          application.user.name,
          createdNOC.nocId,
          'Generated'
        );
      }

      res.status(201).json({
        message: "NOC generated successfully.",
        noc: createdNOC,
      });
    } catch (error) {
      console.error("Error generating NOC:", error);
      res.status(500).json({
        error: "An error occurred while generating the NOC.",
      });
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

  // Controller to fetch all free inspectors under logged in admin from day 8 to day 14
  getFreeInspectors: async (req, res) => {
    const userId = req.user.userId;
    const startDate = new Date();
    const endDate = new Date();

    // Set the range from day 8 to day 14
    startDate.setDate(startDate.getDate() + 8);
    endDate.setDate(endDate.getDate() + 14);

    try {
      // Find the admin by userId
      const admin = await db.admins.findOne({ where: { userId } });

      // Check if the admin exists
      if (!admin) {
        return res.status(404).json({ message: "Admin not found." });
      }

      const adminId = admin.adminId;

      // Find all inspectors under this admin
      const inspectors = await db.inspectors.findAll({
        where: { assignedAdminId: adminId },
        attributes: ["inspectorId", "userId", "region"],
      });

      // Find all inspections scheduled between day 8 and day 14
      const scheduledInspections = await db.inspections.findAll({
        where: {
          inspectionDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        attributes: ["inspectorId", "inspectionDate"],
      });

      // Create a map of inspectorId to their scheduled inspection dates
      const busyInspectors = scheduledInspections.reduce((acc, inspection) => {
        const date = inspection.inspectionDate.toISOString().split("T")[0]; // Normalize date format
        if (!acc[inspection.inspectorId])
          acc[inspection.inspectorId] = new Set();
        acc[inspection.inspectorId].add(date);
        return acc;
      }, {});

      // Initialize the result object for days 8 to 14
      const result = {};
      for (let day = 8; day <= 14; day++) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + day);
        const formattedDate = currentDate.toISOString().split("T")[0];

        // Get free inspectors for the current date
        const freeInspectors = inspectors.filter((inspector) => {
          const busyDates = busyInspectors[inspector.inspectorId] || new Set();
          return !busyDates.has(formattedDate);
        });

        // Add the free inspectors to the result object
        result[`day${day}`] = freeInspectors;
      }

      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching free inspectors:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Approve document
  approveDocument: async (req, res) => {
    const { documentId } = req.params;

    try {
      // Fetch the document to get user details
      const document = await db.documents.findOne({
        where: { documentId },
        include: [{ model: db.users, as: 'user' }],
      });

      if (!document) {
        return res.status(404).json({ message: "Document not found." });
      }

      // Approve the document
      await db.documents.update(
        { isApproved: true },
        { where: { documentId } }
      );

      // Notify the user about document approval via real-time and email
      if (document.user) {


        // Email notification to User
        await emailnotify.sendDocumentApprovedEmail(
          document.user.email,
          document.user.name,
          document.documentId
        );
      }

      res.status(200).json({ message: "Document approved successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // fetch all inspections 
  getAllInspections: async (req, res) => {
    try {
      // Fetch all inspections
      const inspections = await db.inspections.findAll();

      // Map over inspections to fetch related applications
      const inspectionsWithApplications = await Promise.all(
        inspections.map(async (inspection) => {
          const application = await db.applications.findOne({
            where: { applicationId: inspection.applicationId },
          });

          return {
            ...inspection.dataValues,
            applicationStatusId: application?.applicationStatusId || null,
            priority: application?.priority || null,
          };
        })
      );

      res.status(200).json(inspectionsWithApplications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  //Controller to fetch each application details
  fetchInspection: async (req, res) => {
    try {
      // Fetch all inspections
      const inspectionId = req.params;
      const inspections = await db.inspections.findOne({ inspectionId });

      res.status(200).json(inspections);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  rejectApplication: async (req, res) => {
    const { applicationId } = req.params;
    const { newStatus, newRemarks } = req.body;
    try {
      // Fetch the current value of rejectCounter
      const applicationForm = await db.application_forms.findOne({
        where: { applicationId }
      });
      const rejectCounter = applicationForm.rejectCounter;

      // Update application status and remarks in the database
      await db.applications.update(
        { applicationStatusId: newStatus },
        { where: { applicationId } }
      );
      const application = await db.applications.findOne({ where: { applicationId } });
        const userId = application.userId;
        const user = await db.users.findOne({ where: { userId } });
        if(!user) console.log("no user found");
        const applicantEmail = user.email;
        const applicantName = user.name;
      // Check if rejectCounter exceeds 2
      if (rejectCounter >= 2) {
        // Function to delete the application
        application.destroy();
        await db.application_forms.destroy({ where: { applicationId } });

        await emailnotify.sendApplicationDeletionMail(applicantEmail, applicationId, applicantName,newRemarks);
        res.status(200).json({ message: "Application deleted due to multiple rejections." });
      } else {
        await db.application_forms.update(
          {
            remarks: newRemarks,
            rejectCounter: rejectCounter + 1
          },
          { where: { applicationId } }
        );
        await emailnotify.sendApplicationRejectionMail(applicantEmail, applicationId, applicantName,newRemarks);
        res.status(200).json({ message: "Application rejected successfully." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

};
