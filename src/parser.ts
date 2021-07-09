import { JsonRpcProvider } from '@ethersproject/providers'
import { getAddress } from '@ethersproject/address'
import { fetcherLookup } from './fetchers'
import { parserLookup } from './parsers'
import { IPFS_IO_GATEWAY } from './utils/ipfs'

export interface NftMetadata {
  metadata: any

  name?: string
  description?: string

  ownerAddress: string

  tokenURL: string
  tokenURLMimeType: string

  contentURL?: string
  contentURLMimeType?: string

  previewURL?: string
  previewURLMimeType?: string

  externalLink?: string

  attributes?: Record<string, any>[]
}

export type ParserServiceOptions = {
  ipfsBaseURL?: string
  fetchTimeout?: number
}

export class Parser {
  ipfsBaseURL: string
  fetchTimeout: number

  constructor(
    private readonly provider: JsonRpcProvider,
    options: ParserServiceOptions = {},
  ) {
    this.ipfsBaseURL = options.ipfsBaseURL || IPFS_IO_GATEWAY
    this.fetchTimeout = options.fetchTimeout || 10000
  }

  public async fetchUnderlyingContractData(
    contractAddress: string,
    tokenId: string,
  ) {
    const fetcher = fetcherLookup(contractAddress)
    return fetcher({
      provider: this.provider,
      contractAddress,
      tokenId,
    })
  }

  public async parseTokenMetadata(
    contractAddress: string,
    tokenId: string,
    tokenURI: string,
  ) {
    const parser = parserLookup(contractAddress)
    return parser({
      fetchTimeout: this.fetchTimeout,
      provider: this.provider,
      contractAddress,
      tokenId,
      tokenURI,
      ipfsBaseURL: this.ipfsBaseURL,
    })
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
      ownerAddress,
      ...parsedMetadata,
    }
  }
}
