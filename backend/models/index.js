const Sequelize = require("sequelize");
const db_config = require("../config/db.config");

const sequelize = new Sequelize(
  db_config.db_name,
  db_config.db_user,
  db_config.db_pass,
  {
    host: db_config.db_host,
    dialect: db_config.dialect,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: db_config.pool.max,
      min: db_config.pool.min,
      acquire: db_config.pool.acquire,
      idle: db_config.pool.idle,
    },
    // logging: (msg) => console.debug(msg),
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.permissions = require("./permissions.model.js")(sequelize);
db.roles = require("./roles.model.js")(sequelize);
db.role_permissions = require("./role_permissions.model.js")(sequelize);
db.users = require("./users.model.js")(sequelize);
db.audit_logs = require("./audit_logs.model.js")(sequelize);
db.application_statuses = require("./application_statuses.model.js")(sequelize);
db.applications = require("./applications.model.js")(sequelize);
db.application_forms = require("./application_forms.model.js")(sequelize);
db.application_renewals = require("./application_renewals.model.js")(sequelize);
db.notifications = require("./notifications.model.js")(sequelize);
db.documents = require("./documents.model.js")(sequelize);
db.inspectors = require("./inspectors.model.js")(sequelize);
db.admins = require("./admin.model.js")(sequelize);
db.superadmins = require("./superadmin.model.js")(sequelize);
db.inspections = require("./inspections.model.js")(sequelize);
db.inspection_reports = require("./inspection_reports.model.js")(sequelize);
db.follow_up_actions = require("./follow_up_actions.model.js")(sequelize);
db.nocs = require("./nocs.model.js")(sequelize);

// Define Relationships
// SuperAdmin -> Admins (One-to-Many)
db.superadmins.hasMany(db.admins, {
  foreignKey: "assignedSuperAdminId",
  as: "admins",
});
db.admins.belongsTo(db.superadmins, {
  foreignKey: "assignedSuperAdminId",
  as: "superAdmin",
});

// Admin -> Inspectors (One-to-Many)
db.admins.hasMany(db.inspectors, {
  foreignKey: "assignedAdminId",
  as: "inspectors",
});
db.inspectors.belongsTo(db.admins, {
  foreignKey: "assignedAdminId",
  as: "admin",
});

// Users -> SuperAdmins (One-to-One)
db.users.hasOne(db.superadmins, { foreignKey: "userId", as: "superAdmin" });
db.superadmins.belongsTo(db.users, { foreignKey: "userId", as: "user" });

// Users -> Admins (One-to-One)
db.users.hasOne(db.admins, { foreignKey: "userId", as: "admin" });
db.admins.belongsTo(db.users, { foreignKey: "userId", as: "user" });

// Users -> Inspectors (One-to-One)
db.users.hasOne(db.inspectors, { foreignKey: "userId", as: "inspector" });
db.inspectors.belongsTo(db.users, { foreignKey: "userId", as: "user" });

// Users -> Applications (One-to-Many)
db.users.hasMany(db.applications, { foreignKey: "userId" });
db.applications.belongsTo(db.users, { foreignKey: "userId" });

// Applications -> Application Forms (One-to-One)
db.applications.hasOne(db.application_forms, {
  foreignKey: "applicationId",
});
db.application_forms.belongsTo(db.applications, {
  foreignKey: "applicationId",
});

// Applications -> Documents (One-to-Many)
db.applications.hasMany(db.documents, { foreignKey: "applicationId" });
db.documents.belongsTo(db.applications, { foreignKey: "applicationId" });

// Users -> Application Statuses (One-to-Many)
db.application_statuses.hasMany(db.applications, {
  foreignKey: "applicationStatusId",
});
db.applications.belongsTo(db.application_statuses, {
  foreignKey: "applicationStatusId",
});

module.exports = db;
