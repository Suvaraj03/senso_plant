//  const { provisionThing } = require("../utils/iotProvision");
// const { v4: uuidv4 } = require("uuid");

// exports.addDevice = async (req, res) => {
//   try {
//     const deviceId = req.body.deviceId || uuidv4();
//     const thingName = `device_${deviceId}`;

//     const creds = await provisionThing(thingName);

//     // 👉 Save user ↔ device mapping in DB here (omitted for clarity)

//     res.json({
//       thingName,
//       certificatePem: creds.certificatePem,
//       privateKey: creds.privateKey,
//       iotEndpoint: process.env.IOT_ENDPOINT
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Provisioning failed" });
//   }
// };

import {
  getLatestTelemetry,
  getTelemetryHistory,
  getAlerts
} from "../services/deviceData.service.js";

export const latestTelemetry = async (req, res) => {
  try {
    const { thingName } = req.params;
    const data = await getLatestTelemetry(thingName);
    res.json(data);
  }catch (err) {
  console.error("LATEST TELEMETRY ERROR:", err);
  res.status(500).json({
    error: "Failed to fetch latest telemetry",
    details: err.message
  });
}

};

export const telemetryHistory = async (req, res) => {
  try {
    const { thingName } = req.params;
    const { from, to } = req.query;

    const data = await getTelemetryHistory(thingName, from, to);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch telemetry history" });
  }
};

export const alerts = async (req, res) => {
  try {
    const { thingName } = req.params;
    const data = await getAlerts(thingName);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
};
