const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');

// Route: POST /api/otp/send
router.post('/send', otpController.sendRandomOTP);

module.exports = router;
