import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { IoTClient } from "@aws-sdk/client-iot";
import { IoTDataPlaneClient } from "@aws-sdk/client-iot-data-plane";

const REGION = "ap-southeast-1";
const IOT_ENDPOINT = "a1yr864zbzq8lj-ats.iot.ap-southeast-1.amazonaws.com";

export const dynamo = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: REGION })
);

export const iot = new IoTClient({ region: REGION });

export const iotData = new IoTDataPlaneClient({
  region: REGION,
  endpoint: `https://${IOT_ENDPOINT}`
});
