import { Agent, RARIBLE_TOKEN_ADDRESS } from '../../src'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const RARIBLE_CRITERIA = {
  input: {
    tokenId: '1166603',
    tokenAddress: RARIBLE_TOKEN_ADDRESS,
    networkId: 1,
  },
}

describe('Rarible ERC721', () => {
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

  it(`should be able to fetch and parse metadata for token id: ${RARIBLE_CRITERIA.input.tokenId} on network: ${RARIBLE_CRITERIA.input.networkId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      RARIBLE_CRITERIA.input.tokenAddress,
      RARIBLE_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot()
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
