const express = require("express");
const router = express.Router();
const centersController = require("../controllers/centersController");

router.get("/", centersController.getCenters);

router.post("/", centersController.createCenter);

router.put("/:id", centersController.updateCenter);

router.delete("/:id", centersController.deleteCenter);

module.exports = router;
