const express = require("express");
const axios = require("axios");
const db = require("./db");

const app = express();
app.use(express.json());

app.post("/orders", async (req, res) => {
  const { product, quantity } = req.body;

  try {

    // Simulate CPU spike
    if (req.query.cpu === "true") {
      const start = Date.now();
      while (Date.now() - start < 5000) {}
    }

    // Simulate slow response
    if (req.query.slow === "true") {
      await new Promise(r => setTimeout(r, 3000));
    }

    // Insert order
    const [result] = await db.execute(
      "INSERT INTO orders (product, quantity, status) VALUES (?, ?, ?)",
      [product, quantity, "PENDING"]
    );

    // Call payment service
    const paymentResponse = await axios.post(
      "http://localhost:3002/pay" + (req.query.paymentFail ? "?fail=true" : "")
    );

    // Update order
    await db.execute(
      "UPDATE orders SET status=? WHERE id=?",
      ["COMPLETED", result.insertId]
    );

    res.json({
      orderId: result.insertId,
      payment: paymentResponse.data
    });

  } catch (err) {

    if (req.query.error === "true") {
      return res.status(500).json({ error: "Checkout Failed" });
    }

    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log("Orders Service running on port 3001");
});