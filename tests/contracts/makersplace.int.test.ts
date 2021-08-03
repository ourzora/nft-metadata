import { Agent, MAKERSPLACE_TOKEN_ADDRESS, Network } from '../../src'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const IMAGE_CRITERIA = {
  input: {
    tokenId: '100',
    tokenAddress: MAKERSPLACE_TOKEN_ADDRESS,
    networkId: 1,
  },
}
const VIDEO_CRITERIA = {
  input: {
    tokenId: '63253',
    tokenAddress: MAKERSPLACE_TOKEN_ADDRESS,
    networkId: 1,
  },
}

describe('Makersplace ERC721', () => {
  const parser = new Agent({
    providers: {
      [Network.MAINNET]: testProvider,
    },
    ipfsGateway: 'https://ipfsgateway.makersplace.com',
    fetchTimeout: 60000,
  })

  beforeEach(() => {
    jest.setTimeout(120000)
  })

  it(`should be able to fetch and parse metadata for makersplace image — token id: ${IMAGE_CRITERIA.input.tokenId} on network: ${IMAGE_CRITERIA.input.networkId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      IMAGE_CRITERIA.input.tokenAddress,
      IMAGE_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot()
    expect(isAddress(ownerAddress)).toBeTruthy()
  })

  it(`should be able to fetch and parse metadata for makersplace video — token id: ${VIDEO_CRITERIA.input.tokenId} on network: ${IMAGE_CRITERIA.input.networkId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      VIDEO_CRITERIA.input.tokenAddress,
      VIDEO_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot()
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
