const { iot, dynamo } = require("../config/aws");
const { CreateThingCommand,
        CreateKeysAndCertificateCommand,
        AttachPolicyCommand,
        AttachThingPrincipalCommand } = require("@aws-sdk/client-iot");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");

exports.handler = async (event) => {
  const { macAddress, wifiPassword } = JSON.parse(event.body);

  const deviceId = uuidv4();
  const thingName = `device-${deviceId}`;

  await iot.send(new CreateThingCommand({ thingName }));

  const cert = await iot.send(
    new CreateKeysAndCertificateCommand({ setAsActive: true })
  );

  await iot.send(new AttachPolicyCommand({
    policyName: "senso_device_policy",
    target: cert.certificateArn
  }));

  await iot.send(new AttachThingPrincipalCommand({
    thingName,
    principal: cert.certificateArn
  }));

  await dynamo.send(new PutCommand({
    TableName: "Devices",
    Item: {
      deviceId,
      macAddress,
      wifiPassword,
      thingName,
      certificateArn: cert.certificateArn,
      status: "ONLINE",
      createdAt: new Date().toISOString()
    }
  }));

  return {
    statusCode: 200,
    body: JSON.stringify({
      deviceId,
      certificates: {
        certificatePem: cert.certificatePem,
        privateKey: cert.keyPair.PrivateKey
      }
    })
  };
};
