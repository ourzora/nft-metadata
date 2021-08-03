import {
  ART_BLOCKS_CURATED_TOKEN_ADDRESS,
  ART_BLOCKS_TOKEN_ADDRESS,
  Agent,
} from '../../src'
import METADATA_STUB from '../mock-reponses/contracts/artblocks/91000216.json'
import CURATED_METADATA_STUB from '../mock-reponses/contracts/artblocks/curated/100.json'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const ART_BLOCKS_CRITERIA = {
  input: {
    tokenId: '91000216',
    tokenAddress: ART_BLOCKS_TOKEN_ADDRESS,
  },
  output: {
    metadata: METADATA_STUB,
    name: METADATA_STUB.name,
    description: METADATA_STUB.description,
    tokenURL: 'https://api.artblocks.io/token/91000216',
    tokenURLMimeType: 'application/json; charset=utf-8',
    contentURL: METADATA_STUB.animation_url,
    contentURLMimeType: 'text/html; charset=utf-8',
    imageURL: METADATA_STUB.image,
    imageURLMimeType: 'image/png',
    attributes: METADATA_STUB.traits,
    externalURL: METADATA_STUB.external_url,
  },
}
const ART_BLOCKS_CURATED_CRITERIA = {
  input: {
    tokenId: '100',
    tokenAddress: ART_BLOCKS_CURATED_TOKEN_ADDRESS,
  },
  output: {
    metadata: CURATED_METADATA_STUB,
    name: CURATED_METADATA_STUB.name,
    description: CURATED_METADATA_STUB.description,
    tokenURL: 'https://api.artblocks.io/token/100',
    tokenURLMimeType: 'application/json; charset=utf-8',
    contentURL: CURATED_METADATA_STUB.animation_url,
    contentURLMimeType: 'text/html; charset=utf-8',
    imageURL: CURATED_METADATA_STUB.image,
    imageURLMimeType: 'image/png',
    attributes: CURATED_METADATA_STUB.traits,
    externalURL: CURATED_METADATA_STUB.external_url,
  },
}

describe('ArtBlocks ERC721', () => {
  const parser = new Agent({
    providers: {
      1: testProvider,
    },
    ipfsGateway: 'https://gateway.ipfs.io',
    fetchTimeout: 15000,
  })

  beforeEach(() => {
    jest.setTimeout(60000)
  })

  it(`should be able to fetch and parse metadata for token id: ${ART_BLOCKS_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      ART_BLOCKS_CRITERIA.input.tokenAddress,
      ART_BLOCKS_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(ART_BLOCKS_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })

  it(`should be able to fetch and parse metadata for curated token id: ${ART_BLOCKS_CURATED_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchContractData(
      1,
      ART_BLOCKS_CURATED_CRITERIA.input.tokenAddress,
      ART_BLOCKS_CURATED_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(ART_BLOCKS_CURATED_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
