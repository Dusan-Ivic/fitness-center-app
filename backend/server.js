const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");

dotenv.config();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

connectDB(process.env.MONGO_URI);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}...`);
});
