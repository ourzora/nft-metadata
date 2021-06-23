import { Parser, VEE_FRIENDS_TOKEN_ADDRESS } from '../../src'
import METADATA_STUB from '../mock-reponses/contracts/veeFriends/294.json'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const VEE_FRIENDS_CRITERIA = {
  input: {
    tokenId: '294',
    tokenAddress: VEE_FRIENDS_TOKEN_ADDRESS,
  },
  output: {
    metadata: METADATA_STUB,
    name: METADATA_STUB.name,
    description: METADATA_STUB.description,
    tokenURI:
      'https://erc721.veefriends.com/api/metadata/0xa3aee8bce55beea1951ef834b99f3ac60d1abeeb/294',
    contentURI: METADATA_STUB.image,
    attributes: METADATA_STUB.attributes,
    externalURL: METADATA_STUB.external_url,
  },
}

describe('Vee Friends ERC721', () => {
  const parser = new Parser(testProvider)

  beforeEach(() => {
    jest.setTimeout(10000)
  })

  it(`should be able to fetch and parse metadata for token id: ${VEE_FRIENDS_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenMeta(
      VEE_FRIENDS_CRITERIA.input.tokenAddress,
      VEE_FRIENDS_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(VEE_FRIENDS_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
