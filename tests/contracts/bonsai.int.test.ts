import { BONSAI_TOKEN_ADDRESS, Agent, Network } from '../../src'
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
    tokenURL:
      'https://dweb.link/ipfs/QmXPSFmFqfDTMbLePfGTuYa2Vm9CoqsU11ypiMm1nKL8V9/100',
    tokenURLMimeType: 'application/json',
    contentURL: METADATA_STUB.animation_url,
    contentURLMimeType: 'video/mp4',
    imageURL: METADATA_STUB.image,
    imageURLMimeType: 'image/png',
    attributes: METADATA_STUB.attributes,
  },
}

describe('Bonsai ERC721', () => {
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

  it(`should be able to fetch and parse metadata for token id: ${BONSAI_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      BONSAI_CRITERIA.input.tokenAddress,
      BONSAI_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(BONSAI_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
