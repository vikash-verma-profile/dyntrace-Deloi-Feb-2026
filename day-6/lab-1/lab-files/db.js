const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "ecommerce7user",
  password: "password",
  database: "ecommerce7",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();