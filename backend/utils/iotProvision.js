const {
  IoTClient,
  CreateThingCommand,
  CreateKeysAndCertificateCommand,
  AttachPolicyCommand,
  AttachThingPrincipalCommand,
} = require("@aws-sdk/client-iot");

// ============================================
// AWS IoT Client (SDK v3)
// ============================================
const iotClient = new IoTClient({
  region: process.env.AWS_REGION,
  // Credentials are auto-loaded from:
  // - process.env
  // - EC2 / ECS IAM Role
});

// ============================================
// Provision IoT Thing
// ============================================
const provisionThing = async (thingName) => {
  try {
    // 1️ Create IoT Thing
    await iotClient.send(
      new CreateThingCommand({
        thingName,
      })
    );

    // 2️ Create certificate + private key
    const cert = await iotClient.send(
      new CreateKeysAndCertificateCommand({
        setAsActive: true,
      })
    );

    // 3️ Attach IoT policy to certificate
    await iotClient.send(
      new AttachPolicyCommand({
        policyName: process.env.DEVICE_POLICY_NAME,
        target: cert.certificateArn,
      })
    );

    // 4️ Attach certificate to Thing
    await iotClient.send(
      new AttachThingPrincipalCommand({
        thingName,
        principal: cert.certificateArn,
      })
    );

    // 5️ Return credentials (send once to device)
    return {
      thingName,
      certificateArn: cert.certificateArn,
      certificatePem: cert.certificatePem,
      privateKey: cert.keyPair.PrivateKey,
    };
  } catch (error) {
    console.error("❌ IoT Provisioning Failed:", error);
    throw error;
  }
};

module.exports = {
  provisionThing,
};
