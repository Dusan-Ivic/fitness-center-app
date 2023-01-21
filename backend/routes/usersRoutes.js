const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const userValidator = require("../middleware/validators/userValidator");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware.authenticateUser, usersController.getUsers);

router.post("/", userValidator.validateBody, usersController.createUser);

router.put(
  "/:id",
  authMiddleware.authenticateUser,
  userValidator.validateParams,
  userValidator.validateBody,
  usersController.updateUser
);

router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  userValidator.validateParams,
  usersController.deleteUser
);

module.exports = router;
