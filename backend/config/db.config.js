require("dotenv").config();

const db_config = {
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
  db_host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: 10000,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
  define: {
    freezeTableName: true,
  },
};

module.exports = db_config;
