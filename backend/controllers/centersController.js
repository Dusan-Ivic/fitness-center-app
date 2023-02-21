const Center = require("../models/centerModel");
const { validationResult } = require("express-validator");

// @desc    Get all fitness centers
// @route   GET /api/centers
// @access  Public
exports.getCenters = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((err) => err.msg),
    });
  }

  const centers = await Center.find(req.query);

  res.status(200).json({
    success: true,
    count: centers.length,
    data: centers,
  });
};

// @desc    Create new fitness center
// @route   POST /api/centers
// @access  Protected
exports.createCenter = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((err) => err.msg),
    });
  }

  if (req.user.role !== "owner") {
    return res.status(403).json({
      success: false,
      message: "Not authorized to create a fitness center",
    });
  }

  // Set authenticated user as new center's owner
  req.body.owner = req.user._id;

  const center = await Center.create(req.body);

  res.status(201).json({
    success: true,
    message: "Fitness center created",
    data: center,
  });
};

// @desc    Update existing fitness center
// @route   PUT /api/centers/:id
// @access  Protected
exports.updateCenter = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((err) => err.msg),
    });
  }

  const center = await Center.findById(req.params.id);

  if (!center) {
    return res.status(404).json({
      success: false,
      message: "Fitness center with specified ID doesn't exist",
    });
  }

  if (!center.owner.equals(req.user._id)) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to update this fitness center",
    });
  }

  center.name = req.body.name;
  center.address = req.body.address;
  center.openingDate = req.body.openingDate;
  center.monthlyMembershipFee = req.body.monthlyMembershipFee;
  center.annualMembershipFee = req.body.annualMembershipFee;
  center.singleTrainingPrice = req.body.singleTrainingPrice;
  center.groupTrainingPrice = req.body.groupTrainingPrice;
  center.personalTrainingPrice = req.body.personalTrainingPrice;

  await center.save();

  res.status(200).json({
    success: true,
    message: "Fitness center updated",
    data: center,
  });
};

// @desc    Delete existing fitness center
// @route   DELETE /api/centers/:id
// @access  Protected
exports.deleteCenter = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((err) => err.msg),
    });
  }

  const center = await Center.findById(req.params.id);

  if (!center) {
    return res.status(404).json({
      success: false,
      message: "Fitness center with specified ID doesn't exist",
    });
  }

  if (!center.owner.equals(req.user._id)) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to delete this fitness center",
    });
  }

  await center.remove();

  res.status(200).json({
    success: true,
    message: "Fitness center deleted",
    data: {
      _id: req.params.id,
    },
  });
};
