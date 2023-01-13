const User = require("../models/userModel");

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
  const user = await User.create(req.body);

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
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User with specified ID doesn't exist",
    });
  }

  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.gender = req.body.gender;
  user.birthdate = req.body.birthdate;

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
