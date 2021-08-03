import { Agent, FOUNDATION_TOKEN_ADDRESS } from '../../src'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const FND_CRITERIA = {
  input: {
    tokenId: '1798',
    tokenAddress: FOUNDATION_TOKEN_ADDRESS,
    networkId: 1,
  },
}

describe('Foundation ERC721', () => {
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

  it(`should be able to fetch and parse metadata for token id: ${FND_CRITERIA.input.tokenId} on network ${FND_CRITERIA.input.networkId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      FND_CRITERIA.input.networkId,
      FND_CRITERIA.input.tokenAddress,
      FND_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot()
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
