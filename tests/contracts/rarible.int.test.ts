import { MetadataAgent, RARIBLE_TOKEN_ADDRESS } from '../../src'
import METADATA_STUB from '../mock-reponses/contracts/rarible/301_962.json'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const RARIBLE_CRITERIA = {
  input: {
    tokenId:
      '30105810670306411381802272225292624615592980350863712708305530245480406056962',
    tokenAddress: RARIBLE_TOKEN_ADDRESS,
  },
  output: {
    metadata: METADATA_STUB,
    name: METADATA_STUB.name,
    description: METADATA_STUB.description,
    tokenURL:
      'https://gateway.ipfs.io/ipfs/QmfHrsEpXXrvi2dTTNake723kkMapDQXeuYDsVmSRdsQNH',
    tokenURLMimeType: 'application/json',
    contentURL: METADATA_STUB.image,
    contentURLMimeType: 'image/jpeg',
    externalURL: METADATA_STUB.external_url,
    attributes: METADATA_STUB.attributes,
  },
}

describe('Rarible ERC721', () => {
  const parser = new MetadataAgent(testProvider)

  beforeEach(() => {
    jest.setTimeout(10000)
  })

  it(`should be able to fetch and parse metadata for token id: ${RARIBLE_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenMeta(
      RARIBLE_CRITERIA.input.tokenAddress,
      RARIBLE_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(RARIBLE_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
