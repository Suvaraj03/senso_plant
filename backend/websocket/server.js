const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
const clients = {};

wss.on("connection", (ws, req) => {
  const deviceId = req.url.split("=")[1];
  clients[deviceId] = ws;

  ws.on("close", () => delete clients[deviceId]);
});

module.exports.sendToUI = (deviceId, payload) => {
  if (clients[deviceId]) {
    clients[deviceId].send(JSON.stringify(payload));
  }
};
