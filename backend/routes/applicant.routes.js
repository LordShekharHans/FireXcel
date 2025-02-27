const express = require("express");
const renewalController = require("../controllers/renewal.controller.js");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const noauthController = require("../controllers/noauth.controller.js");

router.post("/renew-application", authMiddleware, renewalController.createApplicationRenewal);
router.post("/verify-land", noauthController.verifyLand);

module.exports = router;
