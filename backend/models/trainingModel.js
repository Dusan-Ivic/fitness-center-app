const mongoose = require("mongoose");
const { Schema } = mongoose;

// Options
trainingSchemaOptions = {
  collection: "trainings",
};

// Base schema
const trainingSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    startingTime: {
      type: Date,
      required: true,
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    maxVisitors: {
      type: Number,
      required: true,
    },
  },
  trainingSchemaOptions
);

// Base model
const Training = mongoose.model("Training", trainingSchema);

module.exports = Training;
