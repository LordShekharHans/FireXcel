const express = require("express");
const adminController = require("../controllers/admin.controller.js");
const renewalController = require("../controllers/renewal.controller.js");
const checkAdmin = require("../middlewares/checkAdmin");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// Create an inspection
router.post(
  "/create-inspection",
  authMiddleware,
  checkAdmin,
  adminController.createInspection
);

//Update an inspection
router.put(
  "/update/:inspectionId",
  authMiddleware,
  checkAdmin,
  adminController.updateInspection
);

// Create a new inspector
router.post(
  "/create-inspector",
  authMiddleware,
  checkAdmin,
  adminController.createInspector
);

// Release an inspector
router.patch(
  "/release-inspector/:inspectorId",
  authMiddleware,
  checkAdmin,
  adminController.releaseInspector
);

//View all applications
router.get(
  "/applications",
  authMiddleware,
  checkAdmin,
  adminController.viewAllApplications
);

// Route to fetch application details by applicationId
router.get(
  "/application/:applicationId",
  authMiddleware,
  checkAdmin,
  adminController.fetchApplicationDetails
);

//Get all inspectors only under the current logged in admin
router.get(
  "/inspectors",
  authMiddleware,
  checkAdmin,
  adminController.getInspectors
);

// Generate NOC for a specific application
router.post(
  "/:applicationId/generate",
  authMiddleware,
  checkAdmin,
  adminController.generateNOC
);

//Fetch all nocs
router.get("/nocs", authMiddleware, checkAdmin, adminController.getAllNOCs);

//Route to fetch all free inspectors under logged in admin from day 8 to day 14
router.get(
  "/inspectors/free",
  authMiddleware,
  checkAdmin,
  adminController.getFreeInspectors
);

// Approve Documents
router.patch(
  "/approve/:documentId",
  authMiddleware,
  adminController.approveDocument
);

//get all renewals
router.get("/application-renewals",authMiddleware,checkAdmin, renewalController.getAllApplicationRenewals);
//update a noc after renewal accepts
router.put("/nocs/:nocId",authMiddleware,checkAdmin, renewalController.updateNOC);

// fetch all inspections
router.get("/inspections",authMiddleware,checkAdmin, adminController.getAllInspections);

// fetch inspection details by inspectionId
router.get("/inspection/:inspectionId",authMiddleware,checkAdmin, adminController.fetchInspection);

//Reject Applications
router.patch(
  "/reject/:applicationId",
  authMiddleware,
  checkAdmin,
  adminController.rejectApplication
);


module.exports = router;
