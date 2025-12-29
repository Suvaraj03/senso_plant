client.on("message", async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());

    const [_, deviceId, category, subCategory] = topic.split("/");

    switch (category) {
      case "telemetry":
        await handleTelemetry(deviceId, payload);
        break;

      case "alert":
        await handleAlert(deviceId, payload);
        break;

      case "shadow":
        if (subCategory === "reported") {
          await handleShadowReported(deviceId, payload);
        }
        break;

      default:
        console.log("⚠️ Unknown topic:", topic);
    }
  } catch (err) {
    console.error("❌ MQTT Message Error:", err.message);
  }
});
