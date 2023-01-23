const { body, param } = require("express-validator");
const { isValidObjectId } = require("mongoose");

exports.validateBody = [
  body("name").trim().notEmpty().withMessage("Name is required").bail(),
  body("address").trim().notEmpty().withMessage("Address is required").bail(),
  body("openingYear")
    .trim()
    .notEmpty()
    .withMessage("Opening year is required")
    .bail()
    .isISO8601()
    .withMessage("Opening year is not valid")
    .bail()
    .isBefore()
    .withMessage("Opening year must be in the past")
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
