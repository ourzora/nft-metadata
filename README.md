## @zoralabs/nft-metadata

Javascript library for parsing nft metadata.

This parses data following a variety of standards and contracts. All contracts on https://zora.co/ are parsed using this library.

Supported data encoding methods:

1. http server uri w/ json standard metadata
2. ipfs server uri w/ json standard metadata
3. on-chain data-uri for metadata
4. on-chain data-uri for metadata and content
5. handling for zNFT's seperate metadata and content uris
6. normalization for multiple kinds of data in properties


Special-case contracts that are handled:

1. Using FND, SuperRare, and ZORA custom IPFS gateways
2. Wrapped Punks (fetch image and metadata tags from official on-chain published data)
3. Hashmaps (use a different token address)
4. Autoglyphs (generate metadata tags from scheme and reference official website for svg renderings)
5. Decentraland metadata parsing
