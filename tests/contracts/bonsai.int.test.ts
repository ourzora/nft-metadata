import { Agent, BONSAI_TOKEN_ADDRESS, Network } from '../../src'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const BONSAI_CRITERIA = {
  input: {
    tokenId: '100',
    tokenAddress: BONSAI_TOKEN_ADDRESS,
    networkId: 1,
  },
}

describe('Bonsai ERC721', () => {
  const parser = new Agent({
    providers: {
      [Network.MAINNET]: testProvider,
    },
    ipfsGateway: 'https://ipfs.fleek.co',
    fetchTimeout: 60000,
  })

  beforeEach(() => {
    jest.setTimeout(120000)
  })

  it(`should be able to fetch and parse metadata for token id: ${BONSAI_CRITERIA.input.tokenId} on network ${BONSAI_CRITERIA.input.networkId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      BONSAI_CRITERIA.input.tokenAddress,
      BONSAI_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot()
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
