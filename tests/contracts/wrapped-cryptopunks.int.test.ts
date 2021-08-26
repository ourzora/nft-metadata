import { Agent, WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS } from '../../src'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const WP_CRITERIA = {
  input: {
    tokenId: '5586',
    tokenAddress: WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS,
    networkId: 1,
  },
}

describe('Wrapped Cryptopunks ERC721', () => {
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

  it(`should be able to fetch and parse metadata for token id: ${WP_CRITERIA.input.tokenId} on network: ${WP_CRITERIA.input.networkId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      WP_CRITERIA.input.tokenAddress,
      WP_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot(
      `${WP_CRITERIA.input.tokenAddress}-${WP_CRITERIA.input.tokenId}`,
    )
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
