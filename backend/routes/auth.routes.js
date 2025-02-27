const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// @route POST /api/auth/login
// @desc Login users
// @access Public
router.post("/login", authController.login);

// @route POST /api/auth/register
// @desc Register users
// @access Public
router.post("/register", authController.register);

module.exports = router;
