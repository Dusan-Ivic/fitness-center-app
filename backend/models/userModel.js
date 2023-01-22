const mongoose = require("mongoose");
const { Schema } = mongoose;

// Options
userSchemaOptions = {
  collection: "users",
};

// Base user schema
const userSchema = Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
  },
  userSchemaOptions
);

// Base user model
const User = mongoose.model("User", userSchema);

module.exports = User;
