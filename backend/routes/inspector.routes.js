const express = require("express");
const inspectorController = require("../controllers/inspector.controller.js");
const checkInspector = require("../middlewares/checkInspector.js");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { check } = require("express-validator");

//See all inspections of the logged in inspector
router.get("/my-inspections",authMiddleware, checkInspector, inspectorController.getInspectorInspections);

// Route to upload an inspection report
router.post("/upload/:inspectionId",authMiddleware,checkInspector, inspectorController.uploadInspectionReport);

// Route to update inspection result
router.put("/inspections/:inspectionId/update-result",authMiddleware,checkInspector, inspectorController.updateInspectionResult);

//Routo to fetch own profile information
router.get("/profile",authMiddleware,checkInspector, inspectorController.profile);


module.exports = router;
