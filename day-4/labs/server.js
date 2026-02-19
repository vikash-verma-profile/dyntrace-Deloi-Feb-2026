const express = require("express");
const axios = require("axios");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());

// MySQL Connection Pool
const db = mysql.createPool({
  host: "localhost",
  user: "factoryuser",
  password: "password",
  database: "factory",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Create table if not exists
async function initDB() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product VARCHAR(100),
      quantity INT,
      status VARCHAR(50)
    )
  `);
}
initDB();

// Simulate delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//
// ORDER SERVICE
//
app.post("/order", async (req, res) => {
  const { product, quantity } = req.body;

  try {
    // Generate DB spike
    for (let i = 0; i < 1000; i++) {
      await db.query(
        "INSERT INTO orders(product, quantity, status) VALUES (?, ?, ?)",
        ["Bulk", 1, "CREATED"]
      );
    }

    await db.query(
      "INSERT INTO orders(product, quantity, status) VALUES (?, ?, ?)",
      [product, quantity, "CREATED"]
    );

    await axios.post("http://localhost:5000/production", { product, quantity });

    res.json({ message: "Order processed successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order failed" });
  }
});

//
// PRODUCTION SERVICE
//
app.post("/production", async (req, res) => {
  const { product, quantity } = req.body;

  await delay(2000);
  await axios.post("http://localhost:5000/inventory", { product, quantity });

  res.json({ message: "Production completed" });
});

//
// INVENTORY SERVICE
//
app.post("/inventory", async (req, res) => {
  const { product, quantity } = req.body;

  await delay(150);

  if (quantity > 100) {
    return res.status(500).json({ error: "Insufficient raw material" });
  }

  await axios.post("http://localhost:5000/quality", { product });

  res.json({ message: "Inventory updated" });
});

//
// QUALITY SERVICE
//
app.post("/quality", async (req, res) => {
  await delay(100);

  if (Math.random() < 0.2) {
    return res.status(500).json({ error: "Quality check failed" });
  }

  res.json({ message: "Quality approved" });
});

app.listen(5000, () => {
  console.log("Manufacturing app running on port 5000");
});
