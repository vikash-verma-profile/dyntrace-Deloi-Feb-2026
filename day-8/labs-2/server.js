const express = require("express");
const morgan = require("morgan");
const logger = require("./logger");

const errorRoute = require("./routes/error");
const checkoutRoute = require("./routes/checkout");
const loginRoute = require("./routes/login");

const app = express();
app.use(express.json());

// HTTP request logging
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("E-commerce Lab Application Running");
});

app.use("/error", errorRoute);
app.use("/checkout", checkoutRoute);
app.use("/login", loginRoute);

// Global error handler
app.use((err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});