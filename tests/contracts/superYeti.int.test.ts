import { Agent, SUPER_YETI_TOKEN_ADDRESS } from '../../src'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const SUPER_YET_CRITERIA = {
  input: {
    tokenId: '100',
    tokenAddress: SUPER_YETI_TOKEN_ADDRESS,
    networkId: 1,
  },
}

describe('Super Yeti ERC721', () => {
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

  it(`should be able to fetch and parse metadata for token id: ${SUPER_YET_CRITERIA.input.tokenId} on network: ${SUPER_YET_CRITERIA.input.networkId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      SUPER_YET_CRITERIA.input.tokenAddress,
      SUPER_YET_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot()
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
