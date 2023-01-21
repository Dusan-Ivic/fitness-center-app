const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// @desc    Login existing user
// @route   POST /api/auth/login
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

  if (user.password !== req.body.password) {
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
