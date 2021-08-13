import {
  Agent,
  ZORA_RINKEBY_TOKEN_ADDRESS,
  ZORA_TOKEN_ADDRESS,
} from '../../src'
import { testProvider, testRinkebyProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'
import { additionalMetadataParser } from '../../src/parsers/additionalMetadataParser'
import { fetchZoraContractData } from '../../src/fetchers/zoraFetcher'

const ZORA_CRITERIA = {
  input: {
    tokenId: '100',
    tokenAddress: ZORA_TOKEN_ADDRESS,
    networkId: 1,
  },
}

const ZORA_BURNT_CRITERIA = {
  input: {
    tokenId: '828',
    tokenAddress: ZORA_TOKEN_ADDRESS,
    networkId: 1,
  },
}

const ZORA_NON_URL_CRITERIA = {
  input: {
    tokenId: '3313',
    tokenAddress: ZORA_TOKEN_ADDRESS,
    networkId: 1,
  },
}

const ZORA_RINKEBY_CRITERIA = {
  input: {
    tokenId: '2000',
    tokenAddress: ZORA_RINKEBY_TOKEN_ADDRESS,
    networkId: 4,
  },
}

describe('Zora ERC721', () => {
  const parser = new Agent({
    providers: {
      1: testProvider,
      4: testRinkebyProvider,
    },
    ipfsGateway: process.env.IPFS_GATEWAY_URL || 'https://ipfs.infura.io:5001',
    fetchTimeout: 60000,
    parsers: {
      [ZORA_RINKEBY_TOKEN_ADDRESS]: additionalMetadataParser,
    },
    fetchers: {
      [ZORA_RINKEBY_TOKEN_ADDRESS]: fetchZoraContractData,
    },
  })

  beforeEach(() => {
    jest.setTimeout(60000)
  })

  it(`should be able to fetch and parse metadata for token id: ${ZORA_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      ZORA_CRITERIA.input.tokenAddress,
      ZORA_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot(
      `${ZORA_CRITERIA.input.tokenAddress}-${ZORA_CRITERIA.input.tokenId}-${ZORA_CRITERIA.input.networkId}`,
    )
    expect(isAddress(ownerAddress)).toBeTruthy()
  })

  it(`should be able to fetch and parse metadata for burnt token id: ${ZORA_BURNT_CRITERIA.input.tokenId}`, async () => {
    const meta = await parser.fetchAndParseTokenData(
      1,
      ZORA_BURNT_CRITERIA.input.tokenAddress,
      ZORA_BURNT_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot(
      `${ZORA_BURNT_CRITERIA.input.tokenAddress}-${ZORA_BURNT_CRITERIA.input.tokenId}-${ZORA_BURNT_CRITERIA.input.networkId}`,
    )
  })

  it(`should be able to fetch and parse metadata for token id ${ZORA_NON_URL_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, meta } = await parser.fetchAndParseTokenData(
      1,
      ZORA_TOKEN_ADDRESS,
      ZORA_NON_URL_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot(
      `${ZORA_NON_URL_CRITERIA.input.tokenAddress}-${ZORA_NON_URL_CRITERIA.input.tokenId}-${ZORA_NON_URL_CRITERIA.input.networkId}`,
    )
    expect(isAddress(ownerAddress)).toBeTruthy()
  })

  it(`should be able to fetch and parse metadata for burnt token id ${ZORA_RINKEBY_CRITERIA.input.tokenId} on network id ${ZORA_RINKEBY_CRITERIA.input.networkId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      ZORA_RINKEBY_CRITERIA.input.networkId,
      ZORA_RINKEBY_CRITERIA.input.tokenAddress,
      ZORA_RINKEBY_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot(
      `${ZORA_RINKEBY_CRITERIA.input.tokenAddress}-${ZORA_RINKEBY_CRITERIA.input.tokenId}-${ZORA_RINKEBY_CRITERIA.input.networkId}`,
    )
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
