const { SecretsManagerClient } = require("@aws-sdk/client-secrets-manager");

const secretsClient = new SecretsManagerClient({
  region: process.env.AWS_REGION
});

module.exports = { secretsClient };
