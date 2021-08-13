import { Agent, DECENTRALAND_TOKEN_ADDRESS, Network } from '../../src'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const DECENTRALAND_CRITERIA = {
  input: {
    tokenId: '100',
    tokenAddress: DECENTRALAND_TOKEN_ADDRESS,
    networkId: 1,
  },
}

describe('Decentraland ERC721', () => {
  const parser = new Agent({
    providers: {
      [Network.MAINNET]: testProvider,
    },
    ipfsGateway: 'https://ipfs.fleek.co',
    fetchTimeout: 60000,
  })

  beforeEach(() => {
    jest.setTimeout(60000)
  })

  it(`should be able to fetch and parse metadata for token id: ${DECENTRALAND_CRITERIA.input.tokenId} on network: ${DECENTRALAND_CRITERIA.input.networkId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      DECENTRALAND_CRITERIA.input.tokenAddress,
      DECENTRALAND_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot()
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
