import { MAKERSPLACE_TOKEN_ADDRESS, Agent, Network } from '../../src'
import IMAGE_METADATA_STUB from '../mock-reponses/contracts/makersplace/100.json'
import VIDEO_METADATA_STUB from '../mock-reponses/contracts/makersplace/63253.json'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const IMAGE_CRITERIA = {
  input: {
    tokenId: '100',
    tokenAddress: MAKERSPLACE_TOKEN_ADDRESS,
  },
  output: {
    metadata: IMAGE_METADATA_STUB,
    name: IMAGE_METADATA_STUB.name,
    description: IMAGE_METADATA_STUB.description,
    tokenURL:
      'https://ipfsgateway.makersplace.com/ipfs/QmQZ66nmWPRFTqfuxVuAMHKb57xwhDZfGkSDGd7MJjxbWm',
    tokenURLMimeType: 'application/json',
    contentURL: IMAGE_METADATA_STUB.imageUrl,
    contentURLMimeType: 'image/jpeg',
    attributes: IMAGE_METADATA_STUB.attributes,
  },
}
const VIDEO_CRITERIA = {
  input: {
    tokenId: '63253',
    tokenAddress: MAKERSPLACE_TOKEN_ADDRESS,
  },
  output: {
    metadata: VIDEO_METADATA_STUB,
    name: VIDEO_METADATA_STUB.name,
    description: VIDEO_METADATA_STUB.description,
    tokenURL:
      'https://ipfsgateway.makersplace.com/ipfs/QmczR8BYHGsfMjiQ988mhrQo4Femozf4RoVsqu8PjxFMNU',
    tokenURLMimeType: 'application/json',
    contentURL: VIDEO_METADATA_STUB.properties.preview_media_file2.description,
    contentURLMimeType: 'video/mp4',
    imageURL: VIDEO_METADATA_STUB.imageUrl,
    imageURLMimeType: 'image/jpeg',
    attributes: VIDEO_METADATA_STUB.attributes,
  },
}

describe('Makersplace ERC721', () => {
  const parser = new Agent({
    providers: {
      [Network.MAINNET]: testProvider,
    },
    ipfsGateway: 'https://ipfsgateway.makersplace.com',
    fetchTimeout: 15000,
  })

  beforeEach(() => {
    jest.setTimeout(60000)
  })

  it(`should be able to fetch and parse metadata for makersplace image — token id: ${IMAGE_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      IMAGE_CRITERIA.input.tokenAddress,
      IMAGE_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(IMAGE_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })

  it(`should be able to fetch and parse metadata for makersplace video — token id: ${VIDEO_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      VIDEO_CRITERIA.input.tokenAddress,
      VIDEO_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(VIDEO_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
