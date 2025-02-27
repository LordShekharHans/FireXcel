/**
 * Notification Service
 * This service handles sending real-time notifications to users via Socket.IO
 */

const notificationService = {};

/**
 * Send a notification to a specific user
 * @param {string} userId - ID of the user to notify
 * @param {string} event - Event name
 * @param {object} data - Data to send with the event
 */
notificationService.sendNotification = (userId, event, data) => {
    const io = global.io; // Directly use global.io
    if (!io) {
        console.error('Socket.IO instance not found.');
        return;
    }
    io.to(userId).emit(event, data);
};

module.exports = notificationService;
