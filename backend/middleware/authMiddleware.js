const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const rawToken = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(rawToken, process.env.JWT_SECRET);

      const user = await User.findById(decodedToken.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials (token)",
        });
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials (token)",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Missing credentials (token)",
    });
  }
};
