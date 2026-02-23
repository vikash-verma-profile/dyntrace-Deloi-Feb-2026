const express = require("express");
const app = express();
app.use(express.json());

app.post("/pay", async (req, res) => {

  if (req.query.fail === "true") {
    return res.status(500).json({ error: "Payment Failed" });
  }

  if (req.query.slow === "true") {
    await new Promise(r => setTimeout(r, 3000));
  }

  res.json({ status: "Payment Successful" });
});

app.listen(3002, () => {
  console.log("Payment Service running on port 3002");
});