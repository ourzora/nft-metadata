import { MetadataAgent, SUPERRARE_TOKEN_ADDRESS } from '../../src'
import METADATA_STUB from '../mock-reponses/contracts/superrare/17798.json'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const SUPERARE_CRITERIA = {
  input: {
    tokenId: '17798',
    tokenAddress: SUPERRARE_TOKEN_ADDRESS,
  },
  output: {
    metadata: METADATA_STUB,
    name: METADATA_STUB.name,
    description: METADATA_STUB.description,
    tokenURL:
      'https://ipfs.pixura.io/ipfs/QmfQs1DPrZgmR7osnWvRuXpDvqP5ihfEfSBKPGAQyeL1WS/metadata.json',
    tokenURLMimeType: 'application/json',
    contentURL: METADATA_STUB.image,
    contentURLMimeType: 'image/gif',
  },
}

describe('Superrare ERC721', () => {
  const parser = new MetadataAgent(testProvider)

  beforeEach(() => {
    jest.setTimeout(10000)
  })

  it(`should be able to fetch and parse metadata for token id: ${SUPERARE_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenMeta(
      SUPERARE_CRITERIA.input.tokenAddress,
      SUPERARE_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(SUPERARE_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
