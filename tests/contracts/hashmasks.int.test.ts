import { HASHMASKS_TOKEN_ADDRESS, MetadataAgent } from '../../src'
import METADATA_STUB from '../mock-reponses/contracts/hashmasks/3837.json'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const BORED_APE_CRITERIA = {
  input: {
    tokenId: '3837',
    tokenAddress: HASHMASKS_TOKEN_ADDRESS,
  },
  output: {
    metadata: METADATA_STUB,
    name: 'Chocolate',
    description: METADATA_STUB.description,
    tokenURL: 'https://hashmap.azurewebsites.net/getMask/3837',
    tokenURLMimeType: 'application/json; charset=utf-8',
    contentURL: METADATA_STUB.image,
    contentURLMimeType: 'image/jpeg',
    attributes: METADATA_STUB.attributes,
    externalURL: METADATA_STUB.external_url,
  },
}

describe('Hashmask ERC721', () => {
  const parser = new MetadataAgent(testProvider)

  beforeEach(() => {
    jest.setTimeout(10000)
  })

  it(`should be able to fetch and parse metadata for token id: ${BORED_APE_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenMeta(
      BORED_APE_CRITERIA.input.tokenAddress,
      BORED_APE_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(BORED_APE_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
