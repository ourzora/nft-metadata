import { HASHMASKS_TOKEN_ADDRESS, Agent, Network } from '../../src'
import METADATA_STUB from '../mock-reponses/contracts/hashmasks/3837.json'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const HASHMASK_CRITERIA = {
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
  const parser = new Agent({
    providers: {
      [Network.MAINNET]: testProvider,
    },
    ipfsGateway: 'https://dweb.link',
    fetchTimeout: 15000,
  })

  beforeEach(() => {
    jest.setTimeout(60000)
  })

  it(`should be able to fetch and parse metadata for token id: ${HASHMASK_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      HASHMASK_CRITERIA.input.tokenAddress,
      HASHMASK_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(HASHMASK_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
