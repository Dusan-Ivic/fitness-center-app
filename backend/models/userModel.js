const mongoose = require("mongoose");
const { Schema } = mongoose;

// Options
userSchemaOptions = {
  collection: "users",
  discriminatorKey: "role",
};

// Base schema
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
    role: {
      type: String,
      required: true,
    },
  },
  userSchemaOptions
);

// Visitor schema
const visitorSchema = Schema({
  trainings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Training",
    },
  ],
});

// Trainer schema
const trainerSchema = Schema({
  center: {
    type: Schema.Types.ObjectId,
    ref: "Center",
    required: true,
  },
});

// Base model
const User = mongoose.model("User", userSchema);

// Discriminator models
User.discriminator("visitor", visitorSchema);
User.discriminator("trainer", trainerSchema);

module.exports = User;
