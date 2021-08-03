import { Agent, SORARE_TOKEN_ADDRESS } from '../../src'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const SORARE_CRITERIA = {
  input: {
    tokenId:
      '100408090256748841933639219919068439822835068705742947267506906666220789418990',
    tokenAddress: SORARE_TOKEN_ADDRESS,
    networkId: 1,
  },
}

describe('Sorare ERC721', () => {
  const parser = new Agent({
    providers: {
      1: testProvider,
    },
    ipfsGateway: 'https://ipfs.fleek.co',
    fetchTimeout: 60000,
  })

  beforeEach(() => {
    jest.setTimeout(120000)
  })

  it(`should be able to fetch and parse metadata for token id: ${SORARE_CRITERIA.input.tokenId} on network: ${SORARE_CRITERIA.input.networkId}`, async () => {
    const { ownerAddress, attributes, metadata, ...meta } =
      await parser.fetchAndParseTokenData(
        1,
        SORARE_CRITERIA.input.tokenAddress,
        SORARE_CRITERIA.input.tokenId,
      )
    expect(meta).toMatchSnapshot()
    expect(attributes).toBeDefined()
    expect(attributes).toBeDefined()
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
