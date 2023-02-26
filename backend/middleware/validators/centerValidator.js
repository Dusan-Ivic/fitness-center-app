const { body, param, query } = require("express-validator");
const { isValidObjectId } = require("mongoose");

exports.validateBody = [
  body("name").trim().notEmpty().withMessage("Name is required").bail(),
  body("address").trim().notEmpty().withMessage("Address is required").bail(),
  body("openingDate")
    .trim()
    .notEmpty()
    .withMessage("Opening date is required")
    .bail()
    .isISO8601()
    .withMessage("Opening date is not valid")
    .bail()
    .isBefore()
    .withMessage("Opening date must be in the past")
    .bail(),
  body("monthlyMembershipFee")
    .trim()
    .notEmpty()
    .withMessage("Monthly membership fee is required")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("Monthly membership fee must be a positive number")
    .bail(),
  body("annualMembershipFee")
    .trim()
    .notEmpty()
    .withMessage("Annual membership fee is required")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("Annual membership fee must be a positive number")
    .bail(),
  body("singleTrainingPrice")
    .trim()
    .notEmpty()
    .withMessage("Single training price is required")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("Single training price must be a positive number")
    .bail(),
  body("groupTrainingPrice")
    .trim()
    .notEmpty()
    .withMessage("Group training price is required")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("Group training price must be a positive number")
    .bail(),
  body("personalTrainingPrice")
    .trim()
    .notEmpty()
    .withMessage("Personal training price is required")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("Personal training price must be a positive number")
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

exports.validateQuery = [
  query("_id")
    .optional()
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("Center Id is not valid");
      }
      return true;
    })
    .bail(),
  query("owner")
    .optional()
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("Owner Id is not valid");
      }
      return true;
    })
    .bail(),
];
