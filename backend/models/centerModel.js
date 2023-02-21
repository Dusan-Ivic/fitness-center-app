const mongoose = require("mongoose");
const { Schema } = mongoose;

// Options
centerSchemaOptions = {
  collection: "centers",
};

// Base schema
const centerSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    openingDate: {
      type: Date,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    monthlyMembershipFee: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    annualMembershipFee: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    singleTrainingPrice: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    groupTrainingPrice: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    personalTrainingPrice: {
      type: Schema.Types.Decimal128,
      required: true,
    },
  },
  centerSchemaOptions
);

// Base model
const Center = mongoose.model("Center", centerSchema);

module.exports = Center;
