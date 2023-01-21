const User = require("../models/userModel");
const { validationResult } = require("express-validator");

// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};

// @desc    Create new user
// @route   POST /api/users
// @access  Public
exports.createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((err) => err.msg),
    });
  }

  const emailConflict = await User.findOne({
    email: req.body.email,
  });

  if (emailConflict) {
    return res.status(400).json({
      success: false,
      message: "Email is already taken",
    });
  }

  const usernameConflict = await User.findOne({
    username: req.body.username,
  });

  if (usernameConflict) {
    return res.status(400).json({
      success: false,
      message: "Username is already taken",
    });
  }

  const discriminator = User.discriminators[req.body.role];

  if (!discriminator) {
    return res.status(400).json({
      success: false,
      message: "Invalid role",
    });
  }

  switch (req.body.role) {
    case "visitor":
      req.body.trainings = [];
      break;
    case "trainer":
      req.body.trainings = [];
      break;
    case "owner":
      req.body.centers = [];
      break;
  }

  const user = await discriminator.create(req.body);

  res.status(201).json({
    success: true,
    message: "User created",
    data: user,
  });
};

// @desc    Update existing user
// @route   PUT /api/users/:id
// @access  Public
exports.updateUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((err) => err.msg),
    });
  }

  if (req.user.id !== req.params.id) {
    return res.status(403).json({
      success: false,
      message: "Not authorized (update)",
    });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User with specified ID doesn't exist",
    });
  }

  // Email modified
  if (user.email !== req.body.email) {
    const emailConflict = await User.findOne({
      email: req.body.email,
    });

    if (emailConflict) {
      return res.status(400).json({
        success: false,
        message: "Email is already taken",
      });
    }
  }

  // Username modified
  if (user.username !== req.body.username) {
    const usernameConflict = await User.findOne({
      username: req.body.username,
    });

    if (usernameConflict) {
      return res.status(400).json({
        success: false,
        message: "Username is already taken",
      });
    }
  }

  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.gender = req.body.gender;
  user.birthdate = req.body.birthdate;

  switch (user.role) {
    case "visitor":
      user.trainings = req.body.trainings;
      break;
    case "trainer":
      user.trainings = req.body.trainings;
      user.center = req.body.center;
      break;
    case "owner":
      user.centers = req.body.centers;
      break;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "User updated",
    data: user,
  });
};

// @desc    Delete existing user
// @route   DELETE /api/users/:id
// @access  Public
exports.deleteUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((err) => err.msg),
    });
  }

  if (req.user.id !== req.params.id) {
    return res.status(403).json({
      success: false,
      message: "Not authorized (delete)",
    });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User with specified ID doesn't exist",
    });
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted",
    data: {
      _id: req.params.id,
    },
  });
};
