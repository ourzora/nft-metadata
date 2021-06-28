import { BONSAI_TOKEN_ADDRESS, Parser } from '../../src'
import METADATA_STUB from '../mock-reponses/contracts/bonsai/100.json'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const BONSAI_CRITERIA = {
  input: {
    tokenId: '100',
    tokenAddress: BONSAI_TOKEN_ADDRESS,
  },
  output: {
    metadata: METADATA_STUB,
    name: METADATA_STUB.name,
    description: METADATA_STUB.description,
    tokenURI:
      'https://ipfs.io/ipfs/QmXPSFmFqfDTMbLePfGTuYa2Vm9CoqsU11ypiMm1nKL8V9/100',
    contentURI: METADATA_STUB.animation_url,
    previewURI: METADATA_STUB.image,
    attributes: METADATA_STUB.attributes,
  },
}

describe('Bonsai ERC721', () => {
  const parser = new Parser(testProvider)

  beforeEach(() => {
    jest.setTimeout(10000)
  })

  it(`should be able to fetch and parse metadata for token id: ${BONSAI_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenMeta(
      BONSAI_CRITERIA.input.tokenAddress,
      BONSAI_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(BONSAI_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
