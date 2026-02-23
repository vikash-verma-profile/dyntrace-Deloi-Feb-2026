const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/orders", async (req, res) => {

  try {
    const response = await axios.post(
      "http://localhost:3001/orders" + 
      (req.query.slow ? "?slow=true" : "") +
      (req.query.error ? "?error=true" : "") +
      (req.query.cpu ? "?cpu=true" : ""),
      {
        product: "Laptop",
        quantity: 1
      }
    );

    res.json(response.data);

  } catch (err) {
    res.status(500).json({ error: "Frontend Checkout Failed" });
  }
});

app.listen(3000, () => {
  console.log("Frontend running on port 3000");
});