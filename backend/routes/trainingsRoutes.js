const express = require("express");
const router = express.Router();
const trainingsController = require("../controllers/trainingsController");

router.get("/", trainingsController.getTrainings);

router.post("/", trainingsController.createTraining);

router.put("/:id", trainingsController.updateTraining);

router.delete("/:id", trainingsController.deleteTraining);

module.exports = router;
