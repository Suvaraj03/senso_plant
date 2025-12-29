const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { IoTClient } = require("@aws-sdk/client-iot");

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION
});

const iotClient = new IoTClient({
  region: process.env.AWS_REGION
});

module.exports = {
  dynamoClient,
  iotClient
};
