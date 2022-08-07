const mysql = require("mysql2");
require('dotenv').config();

const dbConnect = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  },
);

dbConnect.connect = () => {
  if(err) {throw err;}
    console.log("Connected to the Tracker_DB")
};

module.exports = dbConnect;