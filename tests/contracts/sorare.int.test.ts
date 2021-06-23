import { Parser, SORARE_TOKEN_ADDRESS } from '../../src'
import METADATA_STUB from '../mock-reponses/contracts/sorare/100_990.json'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const SORARE_CRITERIA = {
  input: {
    tokenId:
      '100408090256748841933639219919068439822835068705742947267506906666220789418990',
    tokenAddress: SORARE_TOKEN_ADDRESS,
  },
  output: {
    metadata: METADATA_STUB,
    name: METADATA_STUB.name,
    description: METADATA_STUB.description,
    tokenURI:
      'https://api.sorare.com/api/v1/cards/100408090256748841933639219919068439822835068705742947267506906666220789418990',
    contentURI: METADATA_STUB.image,
    attributes: METADATA_STUB.attributes,
    externalURL: METADATA_STUB.external_url,
  },
}

describe('Sorare ERC721', () => {
  const parser = new Parser(testProvider)

  beforeEach(() => {
    jest.setTimeout(10000)
  })

  it(`should be able to fetch and parse metadata for token id: ${SORARE_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenMeta(
      SORARE_CRITERIA.input.tokenAddress,
      SORARE_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(SORARE_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
