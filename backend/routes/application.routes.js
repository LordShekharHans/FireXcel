const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/application.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const applicantValidator = require("../middlewares/applicantValidator");

// @route POST /api/application/apply
// @desc Apply for NOC
// @access Private
router.post(
  "/apply",
  authMiddleware,
  applicantValidator,
  applicationController.apply
);

// @route POST /api/application/documents
// @desc Submit documents
// @access Private
router.post(
  "/documents",
  authMiddleware,
  applicationController.uploadDocuments
);

// @route GET /api/application/all
// @desc Get all applications
// @access Private
router.get("/all", authMiddleware, applicationController.getAllApplications);

//get a particular document
router.get(
  "/document/:documentId",
  authMiddleware,
  applicationController.viewDocument
);


// @route GET /api/application/:applicationId
// @desc Get application by ID
// @access Private
router.get(
  "/:applicationId",
  authMiddleware,
  applicationController.getApplicationById
);

// @route GET /api/application/documents/:applicationId
// @desc Get documents by application ID
// @access Private
router.get(
  "/documents/:applicationId",
  authMiddleware,
  applicationController.getDocuments
);

// @route PATCH /api/application/:applicationId
// @desc Update application status
// @access Private
router.patch(
  "/:applicationId",
  authMiddleware,
  applicationController.updateApplicationStatus
);

module.exports = router;
