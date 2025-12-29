const docClient = require("../config/db");
const { 
  PutCommand, 
  GetCommand, 
  UpdateCommand, 
  QueryCommand, 
  ScanCommand, 
  DeleteCommand 
} = require("@aws-sdk/lib-dynamodb");

/**
 * ==========================================
 * DYNAMODB HELPER SERVICE
 * ==========================================
 */

// 1. Create / Replace Item
exports.createItem = async (tableName, item) => {
  const params = {
    TableName: tableName,
    Item: {
      ...item,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
  return await docClient.send(new PutCommand(params));
};

// 2. Get Item by Key
exports.getItem = async (tableName, key) => {
  const params = {
    TableName: tableName,
    Key: key,
  };
  const result = await docClient.send(new GetCommand(params));
  return result.Item;
};

// 3. Update Item
exports.updateItem = async (tableName, key, updateExpression, expressionAttributeValues, expressionAttributeNames) => {
  const params = {
    TableName: tableName,
    Key: key,
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: expressionAttributeNames,
    ReturnValues: "ALL_NEW",
  };
  const result = await docClient.send(new UpdateCommand(params));
  return result.Attributes;
};

// 4. Query Items (using Partition Key)
exports.queryItems = async (tableName, keyConditionExpression, expressionAttributeValues) => {
  const params = {
    TableName: tableName,
    KeyConditionExpression: keyConditionExpression,
    ExpressionAttributeValues: expressionAttributeValues,
  };
  const result = await docClient.send(new QueryCommand(params));
  return result.Items;
};

// 5. Delete Item
exports.deleteItem = async (tableName, key) => {
  const params = {
    TableName: tableName,
    Key: key,
  };
  return await docClient.send(new DeleteCommand(params));
};
