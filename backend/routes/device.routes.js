const express = require("express");
const router = express.Router();
const { addDevice } = require("../controllers/device.controller");

router.post("/add", addDevice);

module.exports = router;
