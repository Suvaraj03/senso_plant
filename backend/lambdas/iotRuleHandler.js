// const { dynamo } = require("../config/aws");
// const { PutCommand } = require("@aws-sdk/lib-dynamodb");

// exports.handler = async (event) => {

//   const { deviceId, type, payload, timestamp } = event;

//   if (type === "telemetry") {
//     await dynamo.send(new PutCommand({
//       TableName: "DeviceTelemetry",
//       Item: { deviceId, timestamp, payload }
//     }));
//   }

//   if (type === "alert") {
//     await dynamo.send(new PutCommand({
//       TableName: "Alert_table",
//       Item: { deviceId, timestamp, alert: payload }
//     }));
//   }

//   return { status: "OK" };
// };

import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const sns = new SNSClient({ region: process.env.AWS_REGION });
const ALERT_TOPIC_ARN = process.env.ALERT_TOPIC_ARN;
// --------------------

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION });

exports.handler = async (event) => {
  // 🔴 THIS IS THE IMPORTANT LINE
  console.log("Incoming IoT Event:", JSON.stringify(event, null, 2));

  const { thingName, ts, type, payload } = event;

  if (!thingName || !ts || !type) {
    console.error("Invalid event format");
    return;
  }

  if (type === "telemetry") {
    await dynamo.send(new PutCommand({
      TableName: "DeviceTelemetry",
      Item: {
        thingName,
        ts,
        dataType: "telemetry",
        payload
      }
    }));
  }

  if (type === "alert") {
  await dynamo.send(new PutCommand({
    TableName: "Alert_table",
    Item: {
      thingName,
      ts,
      dataType: "alert",
      alert: payload
    }
  }));

  await sns.send(new PublishCommand({
    TopicArn: ALERT_TOPIC_ARN,
    Subject: `ALERT from ${thingName}`,
    Message: JSON.stringify(payload, null, 2)
  }));
}


  console.log("DynamoDB write successful");
  return { status: "OK" };
};
