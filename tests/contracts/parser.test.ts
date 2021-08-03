import {
  Agent,
  FOUNDATION_TOKEN_ADDRESS,
  HASHMASKS_TOKEN_ADDRESS,
  ZORA_TOKEN_ADDRESS,
} from '../../src'
import { testProvider } from '../setupProvider'

describe('Parse ERC721 Data', () => {
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

  it(`should be able to fetch and parse metadata for ZORA`, async () => {
    const data = await parser.fetchAndParseTokenData(
      1,
      ZORA_TOKEN_ADDRESS,
      '2343',
    )
    console.log(JSON.stringify(data, null, 2))
  })

  it(`should be able to fetch and parse metadata for FOUNDATION`, async () => {
    const data = await parser.fetchAndParseTokenData(
      1,
      FOUNDATION_TOKEN_ADDRESS,
      '0',
    )
    console.log(JSON.stringify(data, null, 2))
  })

  it(`should be able to fetch and parse metadata for HASHMASKS`, async () => {
    const data = await parser.fetchAndParseTokenData(
      1,
      HASHMASKS_TOKEN_ADDRESS,
      '0',
    )
    console.log(JSON.stringify(data, null, 2))
  })
})
