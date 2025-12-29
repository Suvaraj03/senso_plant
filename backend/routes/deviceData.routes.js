const express = require("express");
const router = express.Router();
const controller = require("../controllers/deviceData.controller");

router.get("/:thingName/latest", controller.getLatest);
router.get("/:thingName/history", controller.getHistory);

module.exports = router;
