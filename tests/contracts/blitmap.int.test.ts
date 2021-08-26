import { Agent, BLITMAP_TOKEN_ADDRESS } from '../../src'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const BLITMAP_CRITERIA = {
  input: {
    tokenId: '565',
    tokenAddress: BLITMAP_TOKEN_ADDRESS,
    networkId: 1,
  },
}

describe('Blitmap ERC721', () => {
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

  it(`should be able to fetch and parse metadata for token id: ${BLITMAP_CRITERIA.input.tokenId} on network: ${BLITMAP_CRITERIA.input.networkId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      BLITMAP_CRITERIA.input.tokenAddress,
      BLITMAP_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot(
      `${BLITMAP_CRITERIA.input.tokenAddress}-${BLITMAP_CRITERIA.input.tokenId}`,
    )
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
