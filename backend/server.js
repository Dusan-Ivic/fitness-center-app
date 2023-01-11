const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");

dotenv.config();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

connectDB(process.env.MONGO_URI);

const app = express();

app.get("/", (req, res) => {
  res.send("Fitness Center Information System");
});

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}...`);
});
