const express = require("express");
const router = express.Router();
const trainingsController = require("../controllers/trainingsController");
const trainingValidator = require("../middleware/validators/trainingValidator");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", trainingsController.getTrainings);

router.post(
  "/",
  authMiddleware.authenticateUser,
  trainingValidator.validateBody,
  trainingsController.createTraining
);

router.put(
  "/:id",
  authMiddleware.authenticateUser,
  trainingValidator.validateParams,
  trainingValidator.validateBody,
  trainingsController.updateTraining
);

router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  trainingValidator.validateParams,
  trainingsController.deleteTraining
);

module.exports = router;
