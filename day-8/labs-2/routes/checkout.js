const express = require("express");
const router = express.Router();
const logger = require("../logger");

router.post("/", (req, res) => {
  const randomFailure = Math.random();

  if (randomFailure < 0.5) {
    logger.error("Checkout failed due to payment gateway timeout");
    return res.status(500).json({ message: "Checkout failed" });
  }

  logger.info("Checkout successful");
  res.json({ message: "Order placed successfully" });
});

module.exports = router;