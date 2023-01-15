const mongoose = require("mongoose");
const { Schema } = mongoose;

// Options
userSchemaOptions = {
  collection: "users",
  discriminatorKey: "role",
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
    role: {
      type: String,
      required: true,
    },
  },
  userSchemaOptions
);

// Visitor sub schema
const visitorSchema = Schema({
  // Trainings visitor is attending
  trainings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Training",
    },
  ],
});

// Trainer sub schema
const trainerSchema = Schema({
  // Trainings trainer is working on
  trainings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Training",
    },
  ],
  // Fitness center trainer is employed in
  center: {
    type: Schema.Types.ObjectId,
    ref: "Center",
  },
});

// Owner sub schema
const ownerSchema = Schema({
  // Owned fitness centers
  centers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Center",
    },
  ],
});

// Base model
const User = mongoose.model("User", userSchema);

// Discriminator models
User.discriminator("visitor", visitorSchema);
User.discriminator("trainer", trainerSchema);
User.discriminator("owner", ownerSchema);

module.exports = User;
