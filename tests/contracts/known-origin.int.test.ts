import { Agent, KNOWN_ORIGIN_TOKEN_ADDRESS } from '../../src'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const KO_CRITERIA = {
  input: {
    tokenId: '219184',
    tokenAddress: KNOWN_ORIGIN_TOKEN_ADDRESS,
    networkId: 1,
  },
}

describe('Known Origin ERC721', () => {
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

  it(`should be able to fetch and parse metadata for token id: ${KO_CRITERIA.input.tokenId} on network: ${KO_CRITERIA.input.networkId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      KO_CRITERIA.input.tokenAddress,
      KO_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot(
      `${KO_CRITERIA.input.tokenAddress}-${KO_CRITERIA.input.tokenId}`,
    )
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
