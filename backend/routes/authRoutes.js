const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authValidator = require("../middleware/validators/authValidator");

router.post("/login", authValidator.validateBody, authController.loginUser);

module.exports = router;
