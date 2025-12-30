// // services/deviceShadow.service.js
// const {
//   IoTDataPlaneClient,
//   UpdateThingShadowCommand
// } = require("@aws-sdk/client-iot-data-plane");

// const client = new IoTDataPlaneClient({
//   region: process.env.AWS_REGION,
//   endpoint: process.env.IOT_DATA_ENDPOINT
// });

// exports.sendCommand = async (deviceId, desiredState) => {
//   const payload = {
//     state: { desired: desiredState }
//   };

//   return client.send(
//     new UpdateThingShadowCommand({
//       thingName: deviceId,
//       payload: Buffer.from(JSON.stringify(payload))
//     })
//   );
// };
