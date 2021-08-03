import { Agent, HASHMASKS_TOKEN_ADDRESS, Network } from '../../src'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const HASHMASK_CRITERIA = {
  input: {
    tokenId: '3837',
    tokenAddress: HASHMASKS_TOKEN_ADDRESS,
    networkId: 1,
  },
}

describe('Hashmask ERC721', () => {
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

  it(`should be able to fetch and parse metadata for token id: ${HASHMASK_CRITERIA.input.tokenId} on network: ${HASHMASK_CRITERIA.input.networkId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      HASHMASK_CRITERIA.input.tokenAddress,
      HASHMASK_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot()
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
