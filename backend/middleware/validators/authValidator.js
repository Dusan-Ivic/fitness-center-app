const { body } = require("express-validator");

exports.validateBody = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Username should be at least 6 characters long")
    .bail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long")
    .bail(),
];
