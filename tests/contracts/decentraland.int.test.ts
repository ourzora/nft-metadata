import { DECENTRALAND_TOKEN_ADDRESS, MetadataAgent } from '../../src'
import METADATA_STUB from '../mock-reponses/contracts/decentraland/100.json'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const DECENTRALAND_CRITERIA = {
  input: {
    tokenId: '100',
    tokenAddress: DECENTRALAND_TOKEN_ADDRESS,
  },
  output: {
    metadata: METADATA_STUB,
    name: METADATA_STUB.name,
    tokenURL:
      'https://api.decentraland.org/v2/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/100',
    tokenURLMimeType: 'application/json',
    contentURL: METADATA_STUB.image,
    contentURLMimeType: 'image/png',
    attributes: METADATA_STUB.attributes,
    externalURL: METADATA_STUB.external_url,
  },
}

describe('Decentraland ERC721', () => {
  const parser = new MetadataAgent(testProvider)

  beforeEach(() => {
    jest.setTimeout(10000)
  })

  it(`should be able to fetch and parse metadata for token id: ${DECENTRALAND_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenMeta(
      DECENTRALAND_CRITERIA.input.tokenAddress,
      DECENTRALAND_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(DECENTRALAND_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
