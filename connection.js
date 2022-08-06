const mysql = require("mysql2");
require('dotenv').config();

const db = mysql.createConnection(
  {host:"localhost"},
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,

console.log("Connected to the Tracker_DB"),
);

