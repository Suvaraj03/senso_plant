const express = require("express");
const { dynamo } = require("../config/aws");
const { QueryCommand } = require("@aws-sdk/lib-dynamodb");

const router = express.Router();

router.get("/:deviceId/telemetry", async (req, res) => {
  try {
    const params = {
      TableName: "TelemetryTable",
      KeyConditionExpression: "deviceId = :d",
      ExpressionAttributeValues: {
        ":d": req.params.deviceId
      }
    };

    const data = await dynamo.send(new QueryCommand(params));
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:deviceId/alerts", async (req, res) => {
  try {
    const params = {
      TableName: "AlertsTable",
      KeyConditionExpression: "deviceId = :d",
      ExpressionAttributeValues: {
        ":d": req.params.deviceId
      }
    };

    const data = await dynamo.send(new QueryCommand(params));
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
