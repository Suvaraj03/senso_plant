// // ============================================
// // 1. Load environment variables
// // ============================================
// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db.js");

// // ============================================
// // 2. Import Routers
// // ============================================
// const AuthRouter = require("./routes/auth.routes.js");
// const WifiRouter = require("./routes/wifi.routes.js");
// const DeviceRouter = require("./routes/device.routes.js");
// const PlantRouter = require("./routes/plant.routes.js");
// const NotificationRouter = require("./routes/notification.routes.js");

// // ============================================
// // 3. Initialize Express App
// // ============================================
// const app = express();

// // ============================================
// // 4. Connect to MongoDB
// // ============================================
// connectDB();

// // ============================================
// // 5. Global Middlewares
// // ============================================

// // Setting security headers to allow window.close() after Google OAuth on Web
// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
//   next();
// });

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: [
//       "http://localhost:8081",
//       "http://192.168.1.3:8081",
//       "http://192.168.1.4:8081",
//       "exp://localhost:8081",
//       "http://54.169.102.133/backend", // Testing Server
//       /^exp:\/\/.*/, // Expo Go (LAN)
//       /^http:\/\/192\.168\..*/, // Your LAN IPs
//       /^http:\/\/10\..*/, // Hotspot networks
//       /^http:\/\/172\..*/, // Company / subnet
//     ],
//     credentials: true,
//   })
// );

// // ============================================
// // 6. Enable MQTT Listener (IoT Real-time Handling)
// // ============================================
// require("./utils/mqttClient.js");

// // ============================================
// // 7. API Routes
// // ============================================
// app.use("/api/auth", AuthRouter);
// app.use("/api/wifi", WifiRouter);
// app.use("/api/device", DeviceRouter);
// app.use("/api/plant", PlantRouter);
// app.use("/api/notification", NotificationRouter);

// // ============================================
// // 8. Root Route (Health Check)
// // ============================================
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "🌱 Senso Plant Backend Running with IoT + Auth 🚀",
//   });
// });

// app.listen(3000, '0.0.0.0', () => {
//   console.log("Server running");
// });
// // ============================================
// // 9. Start Server
// // ============================================
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });
// // 1️⃣ Load env variables


// // --------------------------------------------------------------------
// ============================================
// 1. Load environment variables
// ============================================
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");

// ============================================
// 2. Import Routers
// ============================================
const AuthRouter = require("./routes/auth.routes.js");
const WifiRouter = require("./routes/wifi.routes.js");
const DeviceRouter = require("./routes/device.routes.js");
const PlantRouter = require("./routes/plant.routes.js");
const NotificationRouter = require("./routes/notification.routes.js");
// const AwsRouter = require("./routes/aws.routes.js"); // ✅ AWS ROUTES
const deviceDataRoutes = require("./routes/deviceData.routes");
// const awsRoutes = require("./routes/aws.routes");

// ============================================
// 3. Initialize Express App
// ============================================
const app = express();

// ============================================
// 4. Connect to MongoDB
// ============================================
connectDB();

// ============================================
// 5. Global Middlewares
// ============================================

// Required for Google OAuth popup
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:8081",
      "http://192.168.1.3:8081",
      "http://192.168.1.4:8081",
      "exp://localhost:8081",
      "http://54.169.102.133/backend",
      /^exp:\/\/.*/,
      /^http:\/\/192\.168\..*/,
      /^http:\/\/10\..*/,
      /^http:\/\/172\..*/,
    ],
    credentials: true,
  })
);

// ============================================
// 6. Enable MQTT Listener (IoT Real-time)
// ============================================
// const startMqttSubscriber = require("./mqtt/backendSubscriber");
// require("./realtime/websocket");
// startMqttSubscriber(); // 🔥 START ONCE
const { startMqttSubscriber } = require("./mqtt/backendSubscriber");
require("./realtime/websocket");

startMqttSubscriber(); // 🔥 START ONCE


// ============================================
// 7. API Routes
// ============================================
app.use("/api/auth", AuthRouter);
app.use("/api/wifi", WifiRouter);
app.use("/api/device", DeviceRouter);
app.use("/api/plant", PlantRouter);
app.use("/api/notification", NotificationRouter);
// app.use("/api/aws", AwsRouter); // ✅ AWS TEST ROUTES
app.use("/api/devices", deviceDataRoutes);
// app.use("/api/aws", awsRoutes);
// Use only one router instance




// ============================================
// 8. Root Health Check
// ============================================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🌱 Senso Plant Backend Running with IoT + Auth 🚀",
  });
});

// ============================================
// 9. Start Server (ONLY ONCE)
// ============================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
