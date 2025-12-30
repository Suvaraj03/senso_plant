const mqtt = require("mqtt");
const fs = require("fs");

const client = mqtt.connect({
  host: "a1yr864zbzq8lj-ats.iot.ap-southeast-1.amazonaws.com",
  protocol: "mqtts",
  key: fs.readFileSync("private.key"),
  cert: fs.readFileSync("cert.pem"),
  ca: fs.readFileSync("AmazonRootCA1.pem")
});

client.on("connect", () => {
  console.log("MQTT Connected");
});

module.exports = client;
