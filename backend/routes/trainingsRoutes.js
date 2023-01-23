const express = require("express");
const router = express.Router();
const trainingsController = require("../controllers/trainingsController");
const trainingValidator = require("../middleware/validators/trainingValidator");

router.get("/", trainingsController.getTrainings);

router.post(
  "/",
  trainingValidator.validateBody,
  trainingsController.createTraining
);

router.put(
  "/:id",
  trainingValidator.validateParams,
  trainingValidator.validateBody,
  trainingsController.updateTraining
);

router.delete(
  "/:id",
  trainingValidator.validateParams,
  trainingsController.deleteTraining
);

module.exports = router;
