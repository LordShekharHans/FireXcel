const { v6: uuidv6 } = require("uuid");
const db = require("../models");
const emailService = require("../services/emailServices");

// @route POST /api/application/apply
// @desc Apply for NOC
// @access Public
exports.apply = async (req, res) => {
  const { applicationForm } = req.body;

  if (!applicationForm) {
    return res.status(400).json({ message: "Application form is required" });
  }

  try {
    const application = await db.sequelize.transaction(async (t) => {
      const newApplication = await db.applications.create(
        { userId: req.user.userId, applicationStatusId: 1 },
        { transaction: t }
      );

      await db.application_forms.create(
        {
          ...applicationForm,
          applicationId: newApplication.applicationId,
        },
        { transaction: t }
      );

      return newApplication;
    });

    res.json({ message: "Application submitted successfully", application });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// @route POST /api/application/documents
// @desc Submit documents
// @access Private
exports.uploadDocuments = async (req, res) => {
  const { applicationId, documentType, documentPath } = req.body;

  if (!applicationId || !documentType || !documentPath) {
    return res
      .status(400)
      .json({ message: "Application ID, Doucment Type and Path is required" });
  }

  try {
    const application = await db.applications.findOne({
      where: { applicationId },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.userId !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const document = await db.documents.create({
      documentId: uuidv6(),
      applicationId,
      documentType,
      documentPath,
    });

    res.json({ message: "Document uploaded successfully", document });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// @route GET /api/application/all
// @desc Get all applications
// @access Private
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await db.applications.findAll({
      include: [
        {
          model: db.users,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: db.application_statuses,
        },
      ],
    });

    return res.json({ applications });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
// @route GET /api/application/:applicationId
// @desc Get application by ID
// @access Private
exports.getApplicationById = async (req, res) => {
  const { applicationId } = req.params;

  if (!applicationId) {
    return res.status(400).json({ message: "Application ID is required" });
  }

  try {
    const application = await db.applications.findOne({
      where: { applicationId },
      include: [
        {
          model: db.application_forms,
        },
        {
          model: db.application_statuses,
        },
        {
          model: db.documents,
        },
        {
          model: db.users,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.applicationStatusId === 2) {
      await db.applications.update(
        { applicationStatusId: 3 },
        { where: { applicationId } }
      );
    }

    res.json({ application });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// @route GET /api/application/documents/:applicationId
// @desc Get documents by application ID
// @access Private
exports.getDocuments = async (req, res) => {
  const { applicationId } = req.params;

  if (!applicationId) {
    return res.status(400).json({ message: "Application ID is required" });
  }

  try {
    const application = await db.applications.findOne({
      where: { applicationId },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.userId !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const documents = await db.documents.findAll({
      where: { applicationId },
    });

    res.json({ documents });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// @route PATCH /api/application/:applicationId
// @desc Update application status
// @access Private
exports.updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  if (!applicationId || !status) {
    return res
      .status(400)
      .json({ message: "Application ID and status are required" });
  }

  try {
    const application = await db.applications.findOne({
      where: { applicationId },
      include: [{ model: db.users, as: 'user' }], 
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the application status
    await db.applications.update(
      { applicationStatusId: status },
      { where: { applicationId } }
    );

    // Fetch the updated application with user details
    const updatedApplication = await db.applications.findOne({
      where: { applicationId },
      include: [{ model: db.users, as: 'user' }],
    });

    // Determine the status text based on applicationStatusId
    // Assuming you have a mapping or table for statuses
    const statusMapping = {
      1: "PENDING",
      2: "SUBMITTED",
      3: "UNDER REVIEW",
      4: "STAGE 1 APPROVED",
      5: "FSC APPLIED",
      6: "INSPECTION SCHEDULED",
      7: "INSPECTION COMPLETED",
      8: "NOC APPROVED",
      9: "NOC REJECTED",
      10: "RENEWAL APPLIED",
      11: "RENEWAL APPROVED",
    };

    const statusText = statusMapping[status] || "Status Updated";

    //  // If status is SUBMITTED (2), notify Land Authority
    //  if (status === 2) {
    //   await emailService.sendLandAuthorityEmail(application);
    // }

    // Send email notification to the user
    if (updatedApplication.user) {
      await emailService.sendApplicationStatusUpdateEmail(
        updatedApplication.user.email,
        updatedApplication.user.name,
        updatedApplication.applicationId,
        statusText
      );
    }

    return res.json({ message: "Application status updated successfully" });
  } catch (err) {
    console.error("Error updating application status:", err);
    return res.status(500).json({ message: "An error occurred while updating the application status." });
  }
};

exports.viewDocument = async (req, res) => {
  try {
      const { documentId } = req.params; // Extract documentId from route parameters

      // Find the document in the database
      const document = await InspectionReport.findOne({ where: { id: documentId } });

      if (!document) {
          return res.status(404).json({ message: 'Document not found' });
      }

      // Return the document
      return res.status(200).json(document);
  } catch (error) {
      console.error('Error fetching document:', error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};