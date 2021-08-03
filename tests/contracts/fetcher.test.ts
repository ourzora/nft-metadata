import {
  Agent,
  FOUNDATION_TOKEN_ADDRESS,
  HASHMASKS_TOKEN_ADDRESS,
  ZORA_TOKEN_ADDRESS,
} from '../../src'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'
import { isValidURL } from '../../src/utils/ipfs'

describe('Fetch ERC721 Data', () => {
  const parser = new Agent({
    providers: {
      1: testProvider,
    },
  })

  beforeEach(() => {
    jest.setTimeout(60000)
  })

  it(`should be able to fetch and parse metadata for ZORA`, async () => {
    const data = await parser.fetchContractData(1, ZORA_TOKEN_ADDRESS, '0')
    expect(isAddress(data.ownerAddress)).toBeTruthy()
    if (data.minterAddress) {
      expect(isAddress(data.minterAddress)).toBeTruthy()
    }
  })

  it(`should be able to fetch and parse metadata for FOUNDATION`, async () => {
    const data = await parser.fetchContractData(
      1,
      FOUNDATION_TOKEN_ADDRESS,
      '1',
    )
    expect(isAddress(data.ownerAddress)).toBeTruthy()
  })

  it(`should be able to fetch and parse metadata for HASHMASKS`, async () => {
    const data = await parser.fetchContractData(1, HASHMASKS_TOKEN_ADDRESS, '0')
    expect(isAddress(data.ownerAddress)).toBeTruthy()
    if (data.tokenURI) {
      expect(isValidURL(data.tokenURI)).toBeTruthy()
    }
  })
})
