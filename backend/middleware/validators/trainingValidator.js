const { body, param, query } = require("express-validator");
const { isValidObjectId } = require("mongoose");

exports.validateBody = [
  body("name").trim().notEmpty().withMessage("Name is required").bail(),
  body("type").trim().notEmpty().withMessage("Type is required").bail(),
  body("startingTime")
    .trim()
    .notEmpty()
    .withMessage("Starting time is required")
    .bail()
    .isISO8601()
    .withMessage("Starting time is not valid")
    .bail()
    .isAfter()
    .withMessage("Starting time must be in the future")
    .bail(),
  body("duration")
    .trim()
    .notEmpty()
    .withMessage("Duration fee is required")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("Duration must be a positive number")
    .bail(),
  body("maxVisitors")
    .trim()
    .notEmpty()
    .withMessage("Visitor limit is required")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("Visitor limit must be a positive number")
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
        throw new Error("Training Id is not valid");
      }
      return true;
    })
    .bail(),
  query("trainer")
    .optional()
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("Trainer Id is not valid");
      }
      return true;
    })
    .bail(),
  query("location")
    .optional()
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("Center Id is not valid");
      }
      return true;
    })
    .bail(),
];
