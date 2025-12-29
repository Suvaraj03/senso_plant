 const { provisionThing } = require("../utils/iotProvision");
const { v4: uuidv4 } = require("uuid");

exports.addDevice = async (req, res) => {
  try {
    const deviceId = req.body.deviceId || uuidv4();
    const thingName = `device_${deviceId}`;

    const creds = await provisionThing(thingName);

    // 👉 Save user ↔ device mapping in DB here (omitted for clarity)

    res.json({
      thingName,
      certificatePem: creds.certificatePem,
      privateKey: creds.privateKey,
      iotEndpoint: process.env.IOT_ENDPOINT
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Provisioning failed" });
  }
};
