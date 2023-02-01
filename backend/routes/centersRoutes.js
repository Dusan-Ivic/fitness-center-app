const express = require("express");
const router = express.Router();
const centersController = require("../controllers/centersController");
const centerValidator = require("../middleware/validators/centerValidator");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", centersController.getCenters);

router.post(
  "/",
  authMiddleware.authenticateUser,
  centerValidator.validateBody,
  centersController.createCenter
);

router.put(
  "/:id",
  authMiddleware.authenticateUser,
  centerValidator.validateParams,
  centerValidator.validateBody,
  centersController.updateCenter
);

router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  centerValidator.validateParams,
  centersController.deleteCenter
);

module.exports = router;
