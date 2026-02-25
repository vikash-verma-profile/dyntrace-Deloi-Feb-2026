const express = require("express");
const router = express.Router();
const db = require("../db");
const logger = require("../logger");

router.get("/", async (req, res) => {
  try {
    const username = req.query.username;
    const password = req.query.password;

    const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;

    logger.info(`Executing query: ${query}`);

    const [rows] = await db.query(query);

    if (rows.length > 0) {
      logger.info("Login successful");
      res.json({ message: "Login success" });
    } else {
      logger.warn("Invalid login attempt");
      res.status(401).json({ message: "Invalid credentials" });
    }

  } catch (err) {
    logger.error("Login query failed", { message: err.message, stack: err.stack });
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;