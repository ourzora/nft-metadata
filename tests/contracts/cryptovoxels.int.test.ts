import { CRYPTOVOXELS_TOKEN_ADDRESS, Parser } from '../../src'
import METADATA_STUB from '../mock-reponses/contracts/cryptovoxels/100.json'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const CRYPTOVOXELS_CRITERIA = {
  input: {
    tokenId: '100',
    tokenAddress: CRYPTOVOXELS_TOKEN_ADDRESS,
  },
  output: {
    metadata: METADATA_STUB,
    name: METADATA_STUB.name,
    description: METADATA_STUB.description,
    tokenURL: 'https://www.cryptovoxels.com/p/100',
    tokenURLMimeType: 'application/json; charset=utf-8',
    contentURL: METADATA_STUB.image,
    contentURLMimeType: 'image/png',
    attributes: METADATA_STUB.attributes,
    externalURL: METADATA_STUB.external_url,
  },
}

describe('Cryptovoxels ERC721', () => {
  const parser = new Parser(testProvider)

  beforeEach(() => {
    jest.setTimeout(10000)
  })

  it(`should be able to fetch and parse metadata for token id: ${CRYPTOVOXELS_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenMeta(
      CRYPTOVOXELS_CRITERIA.input.tokenAddress,
      CRYPTOVOXELS_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(CRYPTOVOXELS_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
