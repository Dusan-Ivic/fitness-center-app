// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getUsers = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get all users",
  });
};

// @desc    Create new user
// @route   POST /api/users
// @access  Public
exports.createUser = (req, res) => {
  res.status(201).json({
    success: true,
    message: "Create new user",
    body: req.body,
  });
};

// @desc    Update existing user
// @route   PUT /api/users/:id
// @access  Public
exports.updateUser = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Update existing user",
    body: req.body,
    id: req.params.id,
  });
};

// @desc    Delete existing user
// @route   DELETE /api/users/:id
// @access  Public
exports.deleteUser = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Delete existing user",
    id: req.params.id,
  });
};
