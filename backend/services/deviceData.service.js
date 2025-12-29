const {
  QueryCommand
} = require("@aws-sdk/lib-dynamodb");

const { dynamoClient } = require("../utils/awsClients");

const TABLE = "DeviceTelemetry";

exports.getLatestData = async (thingName) => {
  const command = new QueryCommand({
    TableName: TABLE,
    KeyConditionExpression: "thingName = :t",
    ExpressionAttributeValues: {
      ":t": thingName
    },
    ScanIndexForward: false,
    Limit: 1
  });

  const result = await dynamoClient.send(command);
  return result.Items?.[0] || null;
};

exports.getHistory = async (thingName, from, to) => {
  const command = new QueryCommand({
    TableName: TABLE,
    KeyConditionExpression:
      "thingName = :t AND ts BETWEEN :f AND :to",
    ExpressionAttributeValues: {
      ":t": thingName,
      ":f": Number(from),
      ":to": Number(to)
    }
  });

  const result = await dynamoClient.send(command);
  return result.Items || [];
};

