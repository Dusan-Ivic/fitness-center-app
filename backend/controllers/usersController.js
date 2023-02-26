const User = require("../models/userModel");
const Center = require("../models/centerModel");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc    Get all users
// @route   GET /api/users
// @access  Protected
exports.getUsers = async (req, res) => {
  let users = [];

  if (req.user.role === "owner") {
    // Get all trainers employed in fitness centers owned by req.user
    const centers = await Center.find({ owner: req.user._id });
    const centersIds = centers.map((center) => center._id);
    const Trainer = User.discriminators["trainer"];
    users = await Trainer.find({ center: { $in: centersIds } }).populate(
      "center"
    );
  } else {
    return res.status(403).json({
      success: false,
      message: "Not authorized to get users data",
    });
  }

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};

// @desc    Register new visitor
// @route   POST /api/users
// @access  Public
exports.registerVisitor = async (req, res) => {
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

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;

  req.body.role = "visitor";
  const discriminator = User.discriminators[req.body.role];
  const user = await discriminator.create(req.body);

  res.status(201).json({
    success: true,
    message: "Visitor has successfully registered",
    data: {
      username: user.username,
    },
  });
};

// @desc    Register new trainer
// @route   POST /api/users/employ
// @access  Protected
exports.registerTrainer = async (req, res) => {
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
      message: "Not authorized to register new trainer",
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

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;

  req.body.role = "trainer";
  const discriminator = User.discriminators[req.body.role];
  const user = await discriminator.create(req.body);

  res.status(201).json({
    success: true,
    message: "Trainer registered",
    data: user,
  });
};

// @desc    Login existing user
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((err) => err.msg),
    });
  }

  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Wrong username",
    });
  }

  const passwordsMatch = await bcrypt.compare(req.body.password, user.password);

  if (!passwordsMatch) {
    return res.status(401).json({
      success: false,
      message: "Wrong password",
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.status(200).json({
    success: true,
    message: "User logged in",
    data: user,
    access_token: token,
  });
};

// @desc    Update existing user
// @route   PUT /api/users/:id
// @access  Protected
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
// @access  Protected
exports.deleteUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((err) => err.msg),
    });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User with specified ID doesn't exist",
    });
  }

  // Only owners can delete employed trainers
  if (req.user.role !== "owner" || user.role !== "trainer") {
    return res.status(403).json({
      success: false,
      message: "Not authorized to delete a trainer",
    });
  }

  // Find all fitness centers owned by authenticated owner
  const centers = await Center.find({ owner: req.user._id });
  const centersIds = centers.map((center) => center._id);

  const isEmployee = centersIds.some((cid) => {
    return cid.equals(user.center);
  });

  if (!isEmployee) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to delete a trainer",
    });
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "Trainer deleted",
    data: {
      _id: req.params.id,
    },
  });
};
