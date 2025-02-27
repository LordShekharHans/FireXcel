// services/emailService.js

require('dotenv').config(); // Load environment variables
const nodemailer = require('nodemailer');

/**
 * Create a Nodemailer transporter using SMTP settings.
 */
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // SMTP server (e.g., Gmail)
    port: 465, // Secure port for SSL
    secure: true, // Use SSL
    auth: {
        user: process.env.EMAIL_USERNAME, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or App Password
    },
    tls: {
        rejectUnauthorized: false, // Allow self-signed certificates (use with caution)
    },
    debug: false, // Set to true for debugging
    logger: false, // Set to true to enable logging
});

/**
 * Verify the transporter configuration.
 */
transporter.verify((error, success) => {
    if (error) {
        console.error('Error configuring email transporter:', error);
    } else {
        console.log('Email transporter is ready to send messages');
    }
});

/**
 * Send an email using the transporter.
 * @param {string} to - Recipient's email address.
 * @param {string} subject - Subject of the email.
 * @param {string} html - HTML content of the email.
 */
const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM, // Sender address
        to, // Recipient address
        subject, // Subject line
        html, // HTML body content
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to} with subject "${subject}": ${info.response}`);
    } catch (error) {
        console.error(`Error sending email to ${to}:`, error);
        throw error; // Propagate the error for further handling
    }
};

/**
 * 1. Send Application Status Update Email to User
 * @param {string} userEmail - User's email address.
 * @param {string} userName - User's name.
 * @param {number} applicationId - ID of the application.
 * @param {string} status - New status of the application.
 */
const sendApplicationStatusUpdate = async (userEmail, userName, applicationId, status) => {
    const subject = `Your Application (ID: ${applicationId}) Status Update`;
    const html = `
        <p>Dear ${userName},</p>
        <p>Your application (ID: <strong>${applicationId}</strong>) status has been updated to <strong>${status}</strong>.</p>
        <p>If you have any questions, feel free to contact us.</p>
        <p>Best Regards,<br/>Fire Department Monitoring Team</p>
    `;
    await sendEmail(userEmail, subject, html);
};

/**
 * 2. Send Inspector Created Email to Admin
 * @param {string} adminEmail - Admin's email address.
 * @param {string} adminName - Admin's name.
 * @param {string} inspectorName - Inspector's name.
 * @param {string} inspectorEmail - Inspector's email address.
 */
const sendInspectorCreatedEmail = async (adminEmail, adminName, inspectorName, inspectorEmail) => {
    const subject = `New Inspector Assigned: ${inspectorName}`;
    const html = `
        <p>Dear ${adminName},</p>
        <p>A new inspector has been created and assigned to you:</p>
        <ul>
            <li><strong>Name:</strong> ${inspectorName}</li>
            <li><strong>Email:</strong> ${inspectorEmail}</li>
        </ul>
        <p>Please ensure to coordinate accordingly.</p>
        <p>Best Regards,<br/>Fire Department Monitoring Team</p>
    `;
    await sendEmail(adminEmail, subject, html);
};

/**
 * 3. Send Inspection Assigned Email to Inspector
 * @param {string} inspectorEmail - Inspector's email address.
 * @param {string} inspectorName - Inspector's name.
 * @param {number} inspectionId - ID of the inspection.
 * @param {number} applicationId - ID of the application.
 * @param {string} inspectionDate - Date of the inspection.
 */
const sendInspectionAssignedEmail = async (inspectorEmail, inspectorName, inspectionId, applicationId, inspectionDate) => {
    const subject = `New Inspection Assigned: ID ${inspectionId}`;
    const html = `
        <p>Dear ${inspectorName},</p>
        <p>You have been assigned to a new inspection.</p>
        <ul>
            <li><strong>Inspection ID:</strong> ${inspectionId}</li>
            <li><strong>Application ID:</strong> ${applicationId}</li>
            <li><strong>Date:</strong> ${inspectionDate}</li>
        </ul>
        <p>Please ensure to prepare accordingly.</p>
        <p>Best Regards,<br/>Fire Department Monitoring Team</p>
    `;
    await sendEmail(inspectorEmail, subject, html);
};

/**
 * 4. Send Inspection Assigned to User Email
 * @param {string} userEmail - User's email address.
 * @param {string} userName - User's name.
 * @param {number} inspectionId - ID of the inspection.
 * @param {string} inspectionDate - Date of the inspection.
 */
const sendInspectionAssignedToUserEmail = async (userEmail, userName, inspectionId, inspectionDate) => {
    const subject = `Inspection Assigned to Your Application: ID ${inspectionId}`;
    const html = `
        <p>Dear ${userName},</p>
        <p>An inspection has been assigned to your application.</p>
        <ul>
            <li><strong>Inspection ID:</strong> ${inspectionId}</li>
            <li><strong>Date:</strong> ${inspectionDate}</li>
        </ul>
        <p>Please ensure availability for the inspection.</p>
        <p>Best Regards,<br/>Fire Department Monitoring Team</p>
    `;
    await sendEmail(userEmail, subject, html);
};

/**
 * 5. Send NOC Status Update Email to User
 * @param {string} userEmail - User's email address.
 * @param {string} userName - User's name.
 * @param {number} nocId - ID of the NOC.
 * @param {string} status - Status of the NOC (e.g., 'Generated', 'Updated', 'Expiring Soon').
 */
const sendNocStatusUpdate = async (userEmail, userName, nocId, status) => {
    let subject, html;

    if (status === 'Generated') {
        subject = `Your NOC (ID: ${nocId}) Has Been Generated`;
        html = `
            <p>Dear ${userName},</p>
            <p>Your NOC (ID: <strong>${nocId}</strong>) has been generated and is valid until <strong>${new Date().toDateString()}</strong>.</p>
            <p>If you have any questions, feel free to contact us.</p>
            <p>Best Regards,<br/>Fire Department Monitoring Team</p>
        `;
    } else if (status === 'Updated') {
        subject = `Your NOC (ID: ${nocId}) Has Been Updated`;
        html = `
            <p>Dear ${userName},</p>
            <p>Your NOC (ID: <strong>${nocId}</strong>) has been updated and is now valid until <strong>${new Date().toDateString()}</strong>.</p>
            <p>Please ensure to renew before the expiration date.</p>
            <p>Best Regards,<br/>Fire Department Monitoring Team</p>
        `;
    } else if (status === 'Expiring Soon') {
        subject = `Your NOC (ID: ${nocId}) Is Expiring Soon`;
        html = `
            <p>Dear ${userName},</p>
            <p>Your NOC (ID: <strong>${nocId}</strong>) is set to expire on <strong>${new Date().toDateString()}</strong>.</p>
            <p>Please renew your NOC before the expiration date to avoid any inconvenience.</p>
            <p>If you have already renewed, please ignore this message.</p>
            <p>Best Regards,<br/>Fire Department Monitoring Team</p>
        `;
    } else {
        console.error(`Unknown NOC status: ${status}`);
        return;
    }

    await sendEmail(userEmail, subject, html);
};

/**
 * 6. Send Document Approved Email to User
 * @param {string} userEmail - User's email address.
 * @param {string} userName - User's name.
 * @param {number} documentId - ID of the approved document.
 */
const sendDocumentApprovedEmail = async (userEmail, userName, documentId) => {
    const subject = `Your Document (ID: ${documentId}) Has Been Approved`;
    const html = `
        <p>Dear ${userName},</p>
        <p>Your document (ID: <strong>${documentId}</strong>) has been approved.</p>
        <p>You can now proceed with the next steps.</p>
        <p>Best Regards,<br/>Fire Department Monitoring Team</p>
    `;
    await sendEmail(userEmail, subject, html);
};
/**
 * 7. Send Application Status Update Email to User
 * @param {string} userEmail - User's email address.
 * @param {string} userName - User's name.
 * @param {number} applicationId - ID of the application.
 * @param {string} status - New status of the application.
 */
const sendApplicationStatusUpdateEmail = async (userEmail, userName, applicationId, status) => {
    const subject = `Your Application (ID: ${applicationId}) Status Update`;
    const html = `
        <p>Dear ${userName},</p>
        <p>Your application (ID: <strong>${applicationId}</strong>) status has been updated to <strong>${status}</strong>.</p>
        <p>If you have any questions or need further assistance, feel free to contact us.</p>
        <p>Best Regards,<br/>Fire Department Monitoring Team</p>
    `;
    await sendEmail(userEmail, subject, html);
};
/**
 * Send an OTP email
 * @param {string} to - Recipient's email address
 * @param {string} type - Type of OTP (e.g., "Random OTP")
 * @param {string} otp - The OTP to send
 */
const sendOTPEmail = async (to, type, otp) => {
    const subject = `${type}`;
    const html = `
        <p>Dear User,</p>
        <p>Your OTP is <strong>${otp}</strong>.</p>
        <p>Please use this OTP as required. It is valid for 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best Regards,<br/>Your Application Team</p>
    `;

    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html,
        });

        console.log(`OTP email sent to ${to}: ${info.response}`);
    } catch (error) {
        console.error(`Error sending OTP email to ${to}:`, error);
        throw error;
    }
};
/**
 * Send Email to Land Authority on Submission
 * @param {string} email - Land Authority's email
 * @param {number} applicationId - Application ID
 * @param {string} applicantName - Applicant's name
 * @param {string} applicantEmail - Applicant's email
 * @param {string} redirectUrl - URL to view application details
 */
const sendLandAuthorityEmail = async () => {
    const subject = `Document verification request`;
    const html = `
      <p>Dear Land Authority,</p>
      <p>A new application has been submitted with the following details:</p>
      <p>Please click the button below to verify the application:</p>
      <a href="http://localhost:3000/verify-land" style="
          display: inline-block;
          padding: 10px 20px;
          color: #fff;
          background-color: #28a745;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
      ">Click here to check</a>
      <p>Thank you,<br/>Fire Department Monitoring Team</p>
    `;

    await sendEmail("arpan7de@gmail.com", subject, html);
};

const sendApplicationDeletionMail = async (email, applicationId, applicantName,remarks) => {
    const subject = `Application Deletion Notification: ID ${applicationId}`;
    const html = `
        <p>Dear ${applicantName},</p>
        <p>We regret to inform you that your application with the following details has been deleted:</p>
        <ul>
        <li><strong>Application ID:</strong> ${applicationId}</li>
        <li><strong>Applicant Name:</strong> ${applicantName}</li>
        <li><strong>Remarks:</strong> ${remarks}</li>
        </ul>
        <p>If you have any questions or need further assistance, please contact our support team.</p>
        <p>Thank you,<br/>Fire Department Monitoring Team</p>
    `;

    await sendEmail(email, subject, html);
};
const sendApplicationRejectionMail = async (email, applicationId, applicantName,remarks) => {
    const subject = `Application Rejection Notification: ID ${applicationId}`;
    const html = `
        <p>Dear ${applicantName},</p>
        <p>We regret to inform you that your application with the following details has been Rejected:</p>
        <ul>
        <li><strong>Application ID:</strong> ${applicationId}</li>
        <li><strong>Applicant Name:</strong> ${applicantName}</li>
        <li><strong>Remarks:</strong> ${remarks}</li>
        </ul>
        <p>If you have any questions or need further assistance, please contact our support team.</p>
        <p>Thank you,<br/>Fire Department Monitoring Team</p>
    `;

    await sendEmail(email, subject, html);
};

module.exports = {
    sendApplicationStatusUpdate,
    sendInspectorCreatedEmail,
    sendInspectionAssignedEmail,
    sendInspectionAssignedToUserEmail,
    sendNocStatusUpdate,
    sendDocumentApprovedEmail,
    sendApplicationStatusUpdateEmail,
    sendOTPEmail,
    sendEmail,
    sendLandAuthorityEmail,
    sendApplicationDeletionMail,
    sendApplicationRejectionMail,
};
