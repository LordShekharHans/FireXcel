const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models");
const defaultRoles = require("./data/roles");
const applicationStatuses = require("./data/application_statuses");

const http = require('http'); // Required for Socket.IO
const { Server } = require('socket.io'); // Import Socket.IO
const helmet = require('helmet'); // Import Helmet
const morgan = require('morgan'); // Import Morgan

const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
    cors: {
        origin: "*", // Update this in production to restrict origins
        methods: ["GET", "POST"]
    }
});

// Make io accessible globally
global.io = io;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet()); // Secure HTTP headers
app.use(morgan('combined')); // HTTP request logging

// Socket.IO Middleware for Authentication
const jwt = require('jsonwebtoken');

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error("Authentication error"));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.userId;
        next();
    } catch (err) {
        console.error('Socket.IO Authentication Error:', err.message);
        next(new Error("Authentication error"));
    }
});

// Handle Socket.IO Connections
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.userId}`);

    // Join room specific to the user
    socket.join(socket.userId);

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.userId}`);
    });
});

// Sync Database and Initialize Roles and Statuses
db.sequelize
  .sync({ alter: true })
  .then(async () => {
    for (const role of defaultRoles) {
      await db.roles.findOrCreate({
        where: { roleId: role.roleId },
        defaults: role,
      });
    }

    for (const status of applicationStatuses) {
      await db.application_statuses.findOrCreate({
        where: { applicationStatusId: status.applicationStatusId },
        defaults: status,
      });
    }

    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Trust proxy settings
app.set("trust proxy", true);

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "FDM Server Core" });
});

// Import Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/application", require("./routes/application.routes"));
app.use("/api/superadmin", require("./routes/superAdmin.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/inspector", require("./routes/inspector.routes"));
app.use("/api/applicant", require("./routes/applicant.routes"));
app.use("/api/otp", require("./routes/otp.routes"));

// Start the server
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
