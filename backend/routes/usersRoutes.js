const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const userValidator = require("../middleware/validators/userValidator");

router.get("/", usersController.getUsers);

router.post("/", userValidator.validateBody, usersController.createUser);

router.put("/:id", userValidator.validateBody, usersController.updateUser);

router.delete("/:id", usersController.deleteUser);

module.exports = router;
