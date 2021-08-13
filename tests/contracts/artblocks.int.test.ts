import {
  Agent,
  ART_BLOCKS_CURATED_TOKEN_ADDRESS,
  ART_BLOCKS_TOKEN_ADDRESS,
} from '../../src'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const ART_BLOCKS_CRITERIA = {
  input: {
    tokenId: '91000216',
    tokenAddress: ART_BLOCKS_TOKEN_ADDRESS,
    networkId: 1,
  },
}
const ART_BLOCKS_CURATED_CRITERIA = {
  input: {
    tokenId: '100',
    tokenAddress: ART_BLOCKS_CURATED_TOKEN_ADDRESS,
    networkId: 1,
  },
}

describe('ArtBlocks ERC721', () => {
  const parser = new Agent({
    providers: {
      1: testProvider,
    },
    ipfsGateway: 'https://ipfs.fleek.co',
    fetchTimeout: 10000,
  })

  beforeEach(() => {
    jest.setTimeout(60000)
  })

  it(`should be able to fetch and parse metadata for token id: ${ART_BLOCKS_CRITERIA.input.tokenId} on network: ${ART_BLOCKS_CRITERIA.input.networkId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      ART_BLOCKS_CRITERIA.input.tokenAddress,
      ART_BLOCKS_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot(
      `${ART_BLOCKS_CRITERIA.input.tokenAddress}-${ART_BLOCKS_CRITERIA.input.tokenId}-${ART_BLOCKS_CRITERIA.input.networkId}`,
    )
    expect(isAddress(ownerAddress)).toBeTruthy()
  })

  it(`should be able to fetch and parse metadata for curated token id: ${ART_BLOCKS_CURATED_CRITERIA.input.tokenId} on network: ${ART_BLOCKS_CRITERIA.input.networkId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      ART_BLOCKS_CURATED_CRITERIA.input.tokenAddress,
      ART_BLOCKS_CURATED_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot(
      `${ART_BLOCKS_CURATED_CRITERIA.input.tokenAddress}-${ART_BLOCKS_CURATED_CRITERIA.input.tokenId}-${ART_BLOCKS_CURATED_CRITERIA.input.networkId}`,
    )
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
