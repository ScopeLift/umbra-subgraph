// script for deploying subgraph to Alchemy
// Usage: node script/deploy-alchemy-subgraph.js <network>
require('dotenv').config();
const shell = require('shelljs');

const network = process.argv[2];
const deployKey = process.env[`${network.toUpperCase()}_DEPLOY_KEY`];

if (!deployKey) {
  console.error(`No deploy key found for network: ${network}`);
  process.exit(1);
}
console.log(`Deploying umbra-${network} subgraph to Alchemy...`);
console.log(`Using deploy key: ${deployKey}`);
const command = `graph deploy umbra-${network} --version-label v1.1.4 --node https://subgraphs.alchemy.com/api/subgraphs/deploy --deploy-key ${deployKey} --ipfs https://ipfs.satsuma.xyz`;

shell.exec(command);
