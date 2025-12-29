const { GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const { secretsClient } = require("../aws/clients");

const SECRET_NAME = "backend/iot/mqtt-certs";

let cachedCerts = null;

async function loadMqttCerts() {
  if (cachedCerts) return cachedCerts;

  const command = new GetSecretValueCommand({
    SecretId: SECRET_NAME
  });

  const response = await secretsClient.send(command);
  const secret = JSON.parse(response.SecretString);

  cachedCerts = {
    cert: Buffer.from(secret.certPem),
    key: Buffer.from(secret.privateKey),
    ca: Buffer.from(secret.rootCA)
  };

  return cachedCerts;
}

module.exports = { loadMqttCerts };
