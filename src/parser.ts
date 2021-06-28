import { JsonRpcProvider } from '@ethersproject/providers'
import { getAddress } from '@ethersproject/address'
import { fetcherLookup } from './fetchers'
import { parserLookup } from './parsers'

export interface NftMetadata {
  metadata: any

  name?: string
  description?: string

  ownerAddress: string

  tokenURI: string
  contentURI: string

  externalLink?: string
  attributes?: Record<string, any>[]
}

export class Parser {
  constructor(private readonly provider: JsonRpcProvider) {}

  public async fetchUnderlyingContractData(
    contractAddress: string,
    tokenId: string,
  ) {
    const fetcher = fetcherLookup(contractAddress)
    return fetcher(this.provider, contractAddress, tokenId)
  }

  public async parseTokenMetadata(
    contractAddress: string,
    tokenId: string,
    tokenURI: string,
  ) {
    const parser = parserLookup(contractAddress)
    return parser(this.provider, contractAddress, tokenId, tokenURI)
  }

  public async fetchAndParseTokenMeta(
    tokenAddress: string,
    tokenId: string,
  ): Promise<NftMetadata> {
    const safeAddress = getAddress(tokenAddress)

    const { tokenURI, ownerAddress } = await this.fetchUnderlyingContractData(
      safeAddress,
      tokenId,
    )

    const parsedMetadata = await this.parseTokenMetadata(
      safeAddress,
      tokenId,
      tokenURI,
    )

    return {
      tokenURI,
      ownerAddress,
      ...parsedMetadata,
    }
  }
}
