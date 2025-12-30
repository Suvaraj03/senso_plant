// const {
//   QueryCommand
// } = require("@aws-sdk/lib-dynamodb");

// const { dynamoClient } = require("../utils/awsClients");

// const TABLE = "DeviceTelemetry";

// exports.getLatestData = async (thingName) => {
//   const command = new QueryCommand({
//     TableName: TABLE,
//     KeyConditionExpression: "thingName = :t",
//     ExpressionAttributeValues: {
//       ":t": thingName
//     },
//     ScanIndexForward: false,
//     Limit: 1
//   });

//   const result = await dynamoClient.send(command);
//   return result.Items?.[0] || null;
// };

// exports.getHistory = async (thingName, from, to) => {
//   const command = new QueryCommand({
//     TableName: TABLE,
//     KeyConditionExpression:
//       "thingName = :t AND ts BETWEEN :f AND :to",
//     ExpressionAttributeValues: {
//       ":t": thingName,
//       ":f": Number(from),
//       ":to": Number(to)
//     }
//   });

//   const result = await dynamoClient.send(command);
//   return result.Items || [];
// };
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo } from "../config/aws.js";

const TELEMETRY_TABLE = "DeviceTelemetry";
const ALERT_TABLE = "Alert_table";

export async function getLatestTelemetry(thingName) {
  const result = await dynamo.send(
    new QueryCommand({
      TableName: TELEMETRY_TABLE,
      KeyConditionExpression: "thingName = :t",
      ExpressionAttributeValues: {
        ":t": thingName
      },
      ScanIndexForward: false,
      Limit: 1
    })
  );

  return result.Items?.[0] || null;
}

export async function getTelemetryHistory(thingName, from, to) {
  const result = await dynamo.send(
    new QueryCommand({
      TableName: TELEMETRY_TABLE,
      KeyConditionExpression:
        "thingName = :t AND ts BETWEEN :from AND :to",
      ExpressionAttributeValues: {
        ":t": thingName,
        ":from": Number(from),
        ":to": Number(to)
      },
      ScanIndexForward: true
    })
  );

  return result.Items || [];
}

export async function getAlerts(thingName) {
  const result = await dynamo.send(
    new QueryCommand({
      TableName: ALERT_TABLE,
      KeyConditionExpression: "thingName = :t",
      ExpressionAttributeValues: {
        ":t": thingName
      },
      ScanIndexForward: false
    })
  );

  return result.Items || [];
}
