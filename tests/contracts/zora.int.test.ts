import { Parser, ZORA_TOKEN_ADDRESS } from '../../src'
import METADATA_STUB from '../mock-reponses/contracts/zora/100.json'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const ZORA_CRITERIA = {
  input: {
    tokenId: '100',
    tokenAddress: ZORA_TOKEN_ADDRESS,
  },
  output: {
    metadata: METADATA_STUB,
    name: METADATA_STUB.name,
    description: METADATA_STUB.description,
    contentURI:
      'https://ipfs.fleek.co/ipfs/bafkreic4zqxiofoxuf6dcefp4n5ykynyjncq3ohpz4mh3edet4qseaifb4',
    tokenURI:
      'https://ipfs.fleek.co/ipfs/bafkreic364j5bx3tai5esijlnicpssmmudqlo4nwz5reftkpz6w2qrdhym',
  },
}

describe('Zora ERC721', () => {
  const parser = new Parser(testProvider)

  beforeEach(() => {
    jest.setTimeout(10000)
  })

  it(`should be able to fetch and parse metadata for token id: ${ZORA_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenMeta(
      ZORA_CRITERIA.input.tokenAddress,
      ZORA_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(ZORA_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
