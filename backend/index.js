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
// ============================================
// 1. Load environment variables (ESM way)
// ============================================
import "dotenv/config";

// ============================================
// 2. Imports
// ============================================
import express from "express";
import cors from "cors";

// Routers
import AuthRouter from "./routes/auth.routes.js";
import WifiRouter from "./routes/wifi.routes.js";
import PlantRouter from "./routes/plant.routes.js";
import NotificationRouter from "./routes/notification.routes.js";
import deviceRoutes from "./routes/deviceRoutes.js";
import deviceDataRoutes from "./routes/deviceData.routes.js";

// ============================================
// 3. Initialize Express App
// ============================================
const app = express();

// ============================================
// 4. Global Middlewares
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
// 5. API Routes
// ============================================
app.use("/api/auth", AuthRouter);
app.use("/api/wifi", WifiRouter);
app.use("/api/plant", PlantRouter);
app.use("/api/notification", NotificationRouter);
app.use("/api/devices", deviceRoutes);

// IoT read APIs (telemetry + alerts)
app.use("/api/deviceData", deviceDataRoutes);


// ============================================
// 6. Root Health Check
// ============================================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🌱 Senso Plant Backend Running with IoT + Auth 🚀",
  });
});

// ============================================
// 7. Start Server (ONLY ONCE)
// ============================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
