const Training = require("../models/trainingModel");
const { validationResult } = require("express-validator");

// @desc    Get all trainings
// @route   GET /api/trainings
// @access  Public
exports.getTrainings = async (req, res) => {
  const trainings = await Training.find();

  res.status(200).json({
    success: true,
    count: trainings.length,
    data: trainings,
  });
};

// @desc    Create new training
// @route   POST /api/trainings
// @access  Public
exports.createTraining = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((err) => err.msg),
    });
  }

  if (req.user.role !== "trainer") {
    return res.status(403).json({
      success: false,
      message: "Not authorized to create a training",
    });
  }

  // Set authenticated user as new trainings's trainer
  req.body.trainer = req.user._id;

  // Set training's location to the fitness center authenticated user is employed in
  req.body.location = req.user.center;

  const training = await Training.create(req.body);

  res.status(201).json({
    success: true,
    message: "Training created",
    data: training,
  });
};

// @desc    Update existing training
// @route   PUT /api/trainings/:id
// @access  Public
exports.updateTraining = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((err) => err.msg),
    });
  }

  const training = await Training.findById(req.params.id);

  if (!training) {
    return res.status(404).json({
      success: false,
      message: "Training with specified ID doesn't exist",
    });
  }

  if (!training.trainer.equals(req.user._id)) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to update this training",
    });
  }

  training.name = req.body.name;
  training.type = req.body.type;
  training.startingTime = req.body.startingTime;
  training.duration = req.body.duration;
  training.maxVisitors = req.body.maxVisitors;

  await training.save();

  res.status(200).json({
    success: true,
    message: "Training updated",
    data: training,
  });
};

// @desc    Delete existing training
// @route   DELETE /api/trainings/:id
// @access  Public
exports.deleteTraining = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((err) => err.msg),
    });
  }

  const training = await Training.findById(req.params.id);

  if (!training) {
    return res.status(404).json({
      success: false,
      message: "Training with specified ID doesn't exist",
    });
  }

  if (!training.trainer.equals(req.user._id)) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to delete this training",
    });
  }

  await training.remove();

  res.status(200).json({
    success: true,
    message: "Training deleted",
    data: {
      _id: req.params.id,
    },
  });
};
