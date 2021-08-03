import { Agent, BORED_APE_TOKEN_ADDRESS, Network } from '../../src'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const BORED_APE_CRITERIA = {
  input: {
    tokenId: '1',
    tokenAddress: BORED_APE_TOKEN_ADDRESS,
    networkId: 1,
  },
}

describe('Bored Ape ERC721', () => {
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

  it(`should be able to fetch and parse metadata for token id: ${BORED_APE_CRITERIA.input.tokenId} on network: ${BORED_APE_CRITERIA.input.networkId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      BORED_APE_CRITERIA.input.tokenAddress,
      BORED_APE_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot()
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
