import { MAKERSPLACE_TOKEN_ADDRESS, Parser } from '../../src'
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
    tokenURI:
      'https://ipfsgateway.makersplace.com/ipfs/QmQZ66nmWPRFTqfuxVuAMHKb57xwhDZfGkSDGd7MJjxbWm',
    contentURI: IMAGE_METADATA_STUB.imageUrl,
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
    tokenURI:
      'https://ipfsgateway.makersplace.com/ipfs/QmczR8BYHGsfMjiQ988mhrQo4Femozf4RoVsqu8PjxFMNU',
    contentURI: VIDEO_METADATA_STUB.properties.preview_media_file2.description,
    previewURI: VIDEO_METADATA_STUB.imageUrl,
    attributes: VIDEO_METADATA_STUB.attributes,
  },
}

describe('Makersplace ERC721', () => {
  const parser = new Parser(testProvider)

  beforeEach(() => {
    jest.setTimeout(10000)
  })

  it(`should be able to fetch and parse metadata for makersplace image — token id: ${IMAGE_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenMeta(
      IMAGE_CRITERIA.input.tokenAddress,
      IMAGE_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(IMAGE_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })

  it(`should be able to fetch and parse metadata for makersplace video — token id: ${VIDEO_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenMeta(
      VIDEO_CRITERIA.input.tokenAddress,
      VIDEO_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(VIDEO_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
