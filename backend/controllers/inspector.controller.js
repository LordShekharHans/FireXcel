const db = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  // Controller to fetch all inspections for the logged-in inspector
  getInspectorInspections: async (req, res) => {
    try {
      // Fetch userId from req.user
      const { userId } = req.user;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID not provided in request.",
        });
      }

      // Fetch the inspectorId for the logged-in user
      const inspector = await db.inspectors.findOne({
        where: { userId },
      });

      if (!inspector) {
        return res.status(404).json({
          success: false,
          message: "The user is not an Inspector.",
        });
      }

      const { inspectorId } = inspector;

      // Fetch all inspections for the inspectorId
      const allInspections = await db.inspections.findAll({
        where: { inspectorId },
        attributes: ["inspectionId", "applicationId", "inspectionDate", "result", "comments"],
      });

      if (allInspections.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No inspections found for the logged-in inspector.",
        });
      }

      res.status(200).json(allInspections);
    } catch (error) {
      console.error("Error fetching inspections:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching inspections.",
      });
    }
  },

  // // Controller to upload inspection report for a specific inspection
  // uploadInspectionReport: async (req, res) => {
  //   try {
  //     // Extract inspectionId from request parameters
  //     const { inspectionId } = req.params;

  //     if (!inspectionId) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Inspection ID is required.",
  //       });
  //     }

  //     // Check if a report already exists for the given inspectionId
  //     const existingReport = await db.inspection_reports.findOne({
  //       where: { inspectionId },
  //     });

  //     if (existingReport) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "An inspection report has already been generated for this inspection.",
  //       });
  //     }

  //     // Find the corresponding inspection to get applicationId
  //     const inspection = await db.inspections.findOne({
  //       where: { inspectionId },
  //     });

  //     if (!inspection) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "Inspection not found.",
  //       });
  //     }

  //     const { applicationId } = inspection;

  //     // Extract reports and photos from request body
  //     const { reports, photos } = req.body;

  //     if (!reports || !photos || !Array.isArray(reports) || !Array.isArray(photos)) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Reports and photos must be provided as arrays.",
  //       });
  //     }

  //     // Create a new inspection report
  //     const newReport = await db.inspection_reports.create({
  //       applicationId,
  //       inspectionId,
  //       reports,
  //       photos,
  //     });

  //     res.status(201).json({
  //       success: true,
  //       message: "Inspection report uploaded successfully.",
  //       data: newReport,
  //     });
  //   } catch (error) {
  //     console.error("Error uploading inspection report:", error);
  //     res.status(500).json({
  //       success: false,
  //       message: "An error occurred while uploading the inspection report.",
  //     });
  //   }
  // },


  // Controller to update inspection result
  updateInspectionResult: async (req, res) => {
    try {
      // Extract inspectionId from request parameters
      const { inspectionId } = req.params;

      if (!inspectionId) {
        return res.status(400).json({
          success: false,
          message: "Inspection ID is required.",
        });
      }

      // Extract result and comments from request body
      const { result, comments } = req.body;

      if (!result) {
        return res.status(400).json({
          success: false,
          message: "Inspection result is required.",
        });
      }

      // Find the inspection by inspectionId
      const inspection = await db.inspections.findOne({ where: { inspectionId } });

      if (!inspection) {
        return res.status(404).json({
          success: false,
          message: "Inspection not found.",
        });
      }

      // Update the result and comments for the inspection
      inspection.result = result;
      if (comments) {
        inspection.comments = comments;
      }

      // Save the updated inspection
      await inspection.save();

      res.status(200).json({
        success: true,
        message: "Inspection result updated successfully.",
        data: inspection,
      });
    } catch (error) {
      console.error("Error updating inspection result:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while updating the inspection result.",
      });
    }
  },
  uploadInspectionReport: async (req, res) => {
    try {
      // Extract inspectionId from request parameters
      const { inspectionId } = req.params;

      if (!inspectionId) {
        return res.status(400).json({
          success: false,
          message: "Inspection ID is required."
        });
      }

      // Check if a report already exists for the given inspection
      const existingReport = await db.inspection_reports.findOne({
        where: { inspectionId }
      });

      if (existingReport) {
        return res.status(409).json({
          success: false,
          message: "An inspection report already exists for this inspection."
        });
      }

      // Assume the report data is passed as a variable in the request object
      const report = req.body;

      if (!report || typeof report !== 'object') {
        return res.status(400).json({
          success: false,
          message: "Invalid report data provided."
        });
      }

      // Create the inspection report by destructuring the report variable
      const inspectionReport = await db.inspection_reports.create({
        ...report
      });

      // Return success response
      return res.status(201).json({
        success: true,
        message: "Inspection report uploaded successfully.",
        data: inspectionReport
      });

    } catch (error) {
      console.error("Error uploading inspection report:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while uploading the inspection report.",
        error: error.message
      });
    }
  },

  //Controller to see own profile information
  profile: async (req, res) => {
    try {
      const { userId } = req.user; 
      //Fetch inspector using userId
      const inspector = await db.inspectors.findOne({ where: { userId } });
      if (!inspector) {
        return res.status(404).json({
          success: false,
          message: "User is not an inspector."
        });
      }
      const user = await db.users.findOne({ where: { userId } ,  attributes: { exclude: ["password"] } });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "user not found"
        });
      }

      return res.status(200).json({...inspector.toJSON(),...user.toJSON()});
    }catch{
      console.error("Error fetching user information:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching user information."
      });
    }
  },

};
