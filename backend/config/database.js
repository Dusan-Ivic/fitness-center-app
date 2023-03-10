const mongoose = require("mongoose");

const connectDB = async (connectionString) => {
  try {
    const conn = await mongoose.connect(connectionString);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = { connectDB };
