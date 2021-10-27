## @zoralabs/nft-metadata

Javascript library for parsing nft metadata.

This parses data following a variety of standards and contracts. All contracts on https://zora.co/ are parsed using this library.

### Usage:

Add package:

```sh
yarn add @zoralabs/nft-metadata
```

Use in project:

```ts
import {Agent} from '@zoralabs/nft-metadata';
/* or const {Agent} = require('@zoralabs/nft-metadadata'); */

const parser = new Agent({
  // Use ethers.js Networkish here: numbers (1/4) or strings (homestead/rinkeby) work here
  network: 'homestead',
  // RPC url to access blockchain with. Optional: will fallback to using cloudflare eth
  networkUrl: RPC_URL,
  // IPFS Gateway URL (optional, defaults to cloudflare)
  ipfsGatewayUrl: IPFS_URL,
  // Timeout: defaults to 40 seconds, recommended timeout is 60 seconds (in milliseconds)
  timeout: 60 * 10000,
})

// Can use typical promises or async/await to get the return value of fetchMetadata
parser.fetchMetadata('0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6', '23').then((data) => {
  console.log(data);
})
```

#### Supported data encoding methods:

1. http server uri w/ json standard metadata
2. ipfs server uri w/ json standard metadata
3. on-chain data-uri for metadata
4. on-chain data-uri for metadata and content
5. handling for zNFT's seperate metadata and content uris
6. normalization for multiple kinds of data in properties


#### Special-case contracts that are handled:

1. Using FND, SuperRare, and ZORA custom IPFS gateways
2. Wrapped Punks (fetch image and metadata tags from official on-chain published data)
3. Hashmaps (use a different token address)
4. Autoglyphs (generate metadata tags from scheme and reference official website for svg renderings)
5. Decentraland metadata parsing
