// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers/deviceData.controller");

// router.get("/:thingName/latest", controller.getLatest);
// router.get("/:thingName/history", controller.getHistory);

// module.exports = router;
import express from "express";
import {
  latestTelemetry,
  telemetryHistory,
  alerts
} from "../controllers/deviceController.js";

const router = express.Router();

router.get("/:thingName/latest", latestTelemetry);
router.get("/:thingName/history", telemetryHistory);
router.get("/:thingName/alerts", alerts);
router.get("/test", (req, res) => {
  res.json({ ok: true });
});


export default router;
