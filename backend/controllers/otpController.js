const emailService = require('../services/emailServices');

// Predefined OTPs
const predefinedOTPs = ['2745', '9627', '1217', '6157', '2307'];

/**
 * Send a random OTP from the predefined list
 * @route POST /api/otp/send
 * @param {string} email - Recipient's email address
 */
exports.sendRandomOTP = async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Select a random OTP
    const randomOTP = predefinedOTPs[Math.floor(Math.random() * predefinedOTPs.length)];

    // Send the OTP via email
    await emailService.sendOTPEmail(email, 'Random OTP', randomOTP);

    res.status(200).json({ message: "OTP sent successfully.", otp: randomOTP }); 
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP." });
  }
};
