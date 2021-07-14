import { MetadataAgent, SUPER_YETI_TOKEN_ADDRESS } from '../../src'
import METADATA_STUB from '../mock-reponses/contracts/superYeti/100.json'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const SUPER_YET_CRITERIA = {
  input: {
    tokenId: '100',
    tokenAddress: SUPER_YETI_TOKEN_ADDRESS,
  },
  output: {
    metadata: METADATA_STUB,
    name: METADATA_STUB.name,
    description: METADATA_STUB.description,
    tokenURL:
      'https://defra.systems/metadata/QmXFtqihiEDP5sJwME5dNB3NnYk6LeiepbD4RPP1XES6Ys/asset/100',
    tokenURLMimeType: 'application/json; charset=utf-8',
    contentURL: METADATA_STUB.image,
    contentURLMimeType: 'image/jpeg',
    attributes: METADATA_STUB.attributes,
  },
}

describe('Super Yeti ERC721', () => {
  const parser = new MetadataAgent(testProvider)

  beforeEach(() => {
    jest.setTimeout(10000)
  })

  it(`should be able to fetch and parse metadata for token id: ${SUPER_YET_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenMeta(
      SUPER_YET_CRITERIA.input.tokenAddress,
      SUPER_YET_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(SUPER_YET_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
