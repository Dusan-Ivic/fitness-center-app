const { body, param } = require("express-validator");
const { isValidObjectId } = require("mongoose");

exports.validateBody = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email is not valid")
    .bail(),
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
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .bail(),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .bail(),
  body("gender").trim().notEmpty().withMessage("Gender is required").bail(),
  body("birthdate")
    .trim()
    .notEmpty()
    .withMessage("Birthdate is required")
    .bail()
    .isISO8601()
    .withMessage("Birthdate is not valid")
    .bail()
    .isBefore()
    .withMessage("Birthdate must be in the past")
    .bail(),
  // TODO - Delete after testing; Role should not be set from request
  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .bail()
    .isIn(["visitor", "trainer", "owner"])
    .withMessage("Role is not valid")
    .bail(),
];

exports.validateParams = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("Id is required")
    .bail()
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("Id is not valid");
      }
      return true;
    })
    .bail(),
];