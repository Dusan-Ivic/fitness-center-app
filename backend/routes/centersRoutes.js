const express = require("express");
const router = express.Router();
const centersController = require("../controllers/centersController");
const centerValidator = require("../middleware/validators/centerValidator");

router.get("/", centersController.getCenters);

router.post("/", centerValidator.validateBody, centersController.createCenter);

router.put(
  "/:id",
  centerValidator.validateParams,
  centerValidator.validateBody,
  centersController.updateCenter
);

router.delete(
  "/:id",
  centerValidator.validateParams,
  centersController.deleteCenter
);

module.exports = router;
