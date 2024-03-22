require('dotenv').config();
const shell = require('shelljs');

const deployKey = process.env.BASE_DEPLOY_KEY;
const command = `graph deploy umbra-base --version-label v1.1.0 --node https://subgraphs.alchemy.com/api/subgraphs/deploy --deploy-key ${deployKey} --ipfs https://ipfs.satsuma.xyz`;

shell.exec(command);