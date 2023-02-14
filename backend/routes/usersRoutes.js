const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const userValidator = require("../middleware/validators/userValidator");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware.authenticateUser, usersController.getUsers);

router.post(
  "/",
  userValidator.validateRegisterBody,
  usersController.registerVisitor
);

router.post(
  "/employ",
  authMiddleware.authenticateUser,
  userValidator.validateRegisterBody,
  userValidator.validateTrainerBody,
  usersController.registerTrainer
);

router.post(
  "/login",
  userValidator.validateLoginBody,
  usersController.loginUser
);

router.put(
  "/:id",
  authMiddleware.authenticateUser,
  userValidator.validateUserParams,
  userValidator.validateUpdateBody,
  usersController.updateUser
);

router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  userValidator.validateUserParams,
  usersController.deleteUser
);

module.exports = router;
