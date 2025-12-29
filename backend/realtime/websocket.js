const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8081 });

exports.broadcast = (thingName, data) => {
  const message = JSON.stringify({ thingName, data });

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

console.log("✅ WebSocket server running on :8081");
