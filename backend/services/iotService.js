// backend/services/iotService.js

const { iotData } = require("../config/aws");
const { PublishCommand } = require("@aws-sdk/client-iot-data-plane");

/**
 * Publish telemetry data to AWS IoT Core
 */
exports.publishTelemetry = async (deviceId, payload) => {
  try {
    await iotData.send(
      new PublishCommand({
        topic: `devices/${deviceId}/telemetry`,
        payload: Buffer.from(JSON.stringify(payload)),
        qos: 1
      })
    );
  } catch (err) {
    console.error("Telemetry publish failed:", err);
    throw err;
  }
};

/**
 * Publish alert message to AWS IoT Core
 */
exports.publishAlert = async (deviceId, alert) => {
  try {
    await iotData.send(
      new PublishCommand({
        topic: `devices/${deviceId}/alert`,
        payload: Buffer.from(JSON.stringify({ alert })),
        qos: 1
      })
    );
  } catch (err) {
    console.error("Alert publish failed:", err);
    throw err;
  }
};

