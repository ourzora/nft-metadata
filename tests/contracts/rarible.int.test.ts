import { Parser } from '../../src/parser'
import { RARIBLE_TOKEN_ADDRESS } from '../../src/constants/addresses'
import RARIBLE_METADATA_STUB from '../mock-reponses/contracts/rarible/301_962.json'
import { testProvider } from '../mock-reponses/setupProvider'
import { isAddress } from '@ethersproject/address'

const RARIBLE_MAINNET_MOCK = {
  input: {
    tokenId:
      '30105810670306411381802272225292624615592980350863712708305530245480406056962',
    tokenAddress: RARIBLE_TOKEN_ADDRESS,
  },
  output: {
    metadata: RARIBLE_METADATA_STUB,
    name: RARIBLE_METADATA_STUB.name,
    description: RARIBLE_METADATA_STUB.description,
    tokenURI:
      'https://ipfs.io/ipfs/QmfHrsEpXXrvi2dTTNake723kkMapDQXeuYDsVmSRdsQNH',
    contentURI: RARIBLE_METADATA_STUB.image,
    externalURL: RARIBLE_METADATA_STUB.external_url,
    attributes: RARIBLE_METADATA_STUB.attributes,
  },
}

describe('Rarible ERC721', () => {
  const parser = new Parser(testProvider)

  beforeEach(() => {
    jest.setTimeout(10000)
  })

  it('should be able to fetch and parse metadata for a rarible erc721', async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenMeta(
      RARIBLE_MAINNET_MOCK.input.tokenAddress,
      RARIBLE_MAINNET_MOCK.input.tokenId,
    )
    expect(meta).toStrictEqual(RARIBLE_MAINNET_MOCK.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
