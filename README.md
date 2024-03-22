# Umbra Subgraph

## Development

1. Install packages with `yarn`
2. Update contract details in the `config` folder
3. Authenticate with `yarn graph auth https://api.thegraph.com/deploy/ <access-token>`
4. Deploy with `yarn deploy:<network>`

Note: For the Base network subgraph (which is deployed to Alchemy), step 3 above should be skipped, and it will be necessary to create a .env file with the following content:

```
BASE_DEPLOY_KEY=<access-token>
```

in order to authenticate the Alchemy deploy of the Base network subgraph.
