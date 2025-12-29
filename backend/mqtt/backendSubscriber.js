const mqtt = require("mqtt");
const { loadMqttCerts } = require("../utils/loadMqttCerts");
const { broadcast } = require("../realtime/websocket");

let client;

async function startMqttSubscriber() {
  if (client) return client;

  const { cert, key, ca } = await loadMqttCerts();

  client = mqtt.connect({
    host: process.env.IOT_ENDPOINT,
    protocol: "mqtts",
    clientId: "backend-subscriber",
    cert,
    key,
    ca,
    reconnectPeriod: 5000,
    keepalive: 60,
    clean: true
  });

  client.on("connect", () => {
    console.log("✅ Backend MQTT connected (Secrets Manager)");
    client.subscribe("devices/+/data");
  });

  client.on("message", (topic, payload) => {
    try {
      const thingName = topic.split("/")[1];
      const data = JSON.parse(payload.toString());

      console.log("📡 LIVE:", thingName, data);

      // STEP 7 — live UI
      broadcast(thingName, data);
    } catch (err) {
      console.error("MQTT parse error", err);
    }
  });

  client.on("error", err => {
    console.error("MQTT error", err);
  });

  return client;
}

module.exports = { startMqttSubscriber };
