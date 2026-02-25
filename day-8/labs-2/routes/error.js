const express = require("express");
const router = express.Router();
const logger = require("../logger");

router.get("/", (req, res) => {
  logger.error("Database connection failed");
  throw new Error("Database connection failed");
});

module.exports = router;