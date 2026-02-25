const express = require("express");
const router = express.Router();
const db = require("../db");
const logger = require("../logger");

router.get("/", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;

  logger.info(`Executing query: ${query}`);

  db.all(query, [], (err, rows) => {
    if (err) {
      logger.error("Login query failed", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (rows.length > 0) {
      logger.info("Login successful");
      res.json({ message: "Login success" });
    } else {
      logger.warn("Invalid login attempt");
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

module.exports = router;