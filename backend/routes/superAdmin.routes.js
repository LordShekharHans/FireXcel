const express = require("express");
const superAdminController = require("../controllers/superAdmin.controller.js");
const checkSuperAdmin = require("../middlewares/checkSuperAdmin");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// Route to get fetch applications 
router.get("/applications",authMiddleware,checkSuperAdmin, superAdminController.viewAllApplications);
// Route to fetch application details by applicationId
router.get('/application/:applicationId', authMiddleware,checkSuperAdmin,superAdminController.fetchApplicationDetails);
// Route to delete an application 
router.delete("/application/:id",authMiddleware, checkSuperAdmin, superAdminController.deleteApplication);
// Route to fetch all nocs
router.get("/nocs",authMiddleware,checkSuperAdmin, superAdminController.getAllNOCs);

// Route to create another SuperAdmin
router.post("/create-superadmin",authMiddleware, checkSuperAdmin, superAdminController.createSuperAdmin);
// Route to create an Admin 
router.post("/create-admin",authMiddleware, checkSuperAdmin, superAdminController.createAdmin);
// Route to create an Inspector 
router.post("/create-inspector",authMiddleware, checkSuperAdmin, superAdminController.createInspector);
// Delete superadmin account
router.delete("/delete-superadmin/:id", authMiddleware, checkSuperAdmin, superAdminController.deleteSuperAdmin);
// Delete admin account
router.delete("/delete-admin/:id", authMiddleware, checkSuperAdmin, superAdminController.deleteAdmin);
// Delete inspector account
router.delete("/delete-inspector/:id", authMiddleware, checkSuperAdmin, superAdminController.deleteInspector);

// Fetch all admin accounts
router.get("/all-admins", authMiddleware, checkSuperAdmin, superAdminController.getAllAdmins);
// Fetch all inspectors by assignedAdminId
router.get("/inspectorsviaadmin/:assignedAdminId",authMiddleware,checkSuperAdmin,superAdminController.getInspectorsByAdmin);
// fetch all inspectors without admin
router.get("/inspectorswithoutadmin",authMiddleware,checkSuperAdmin,superAdminController.getInspectorsWithoutAdmins)

//Update assigned admin of an existing inspector (here id is of existing inspector)
router.put("/updateassignedadmin/:id",authMiddleware,checkSuperAdmin,superAdminController.updateInspectorAdmin);

// Fetch admin details by adminId
router.get('/get-admin/:adminId', authMiddleware,checkSuperAdmin,superAdminController.fetchAdminDetails);
// Fetch inspector details by inspectorId
router.get('/get-inspector/:inspectorId', authMiddleware,checkSuperAdmin,superAdminController.fetchInspectorDetails);

// fetch all nocs based on divisions
// router.get('/nocs-by-divisions', authMiddleware,checkSuperAdmin,superAdminController.nocsByDivisions);

module.exports = router;
