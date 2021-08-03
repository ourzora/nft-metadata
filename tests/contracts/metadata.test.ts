import { Agent, ZORA_TOKEN_ADDRESS } from '../../src'
import { testProvider } from '../setupProvider'
import METADATA_STUB from '../mock-reponses/contracts/zora/100.json'

describe('Fetch ERC721 Data', () => {
  const parser = new Agent({
    providers: {
      1: testProvider,
    },
  })

  beforeEach(() => {
    jest.setTimeout(60000)
  })

  it(`should be able to fetch metadata for ZORA`, async () => {
    const token = await parser.fetchContractData(1, ZORA_TOKEN_ADDRESS, 100)
    if (token.tokenURI) {
      const data = await parser.fetchMetadata(token.tokenURI)
      expect(data.tokenURIContentType).toStrictEqual('application/json')
      expect(data.metadata).toStrictEqual(METADATA_STUB)
    }
  })
})
