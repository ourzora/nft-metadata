import { JsonRpcProvider } from '@ethersproject/providers'
import { fetchOwnerOf, getSupportedInterfaces } from './utils/contracts'
import { Erc721Factory } from '@zoralabs/core/dist/typechain'
import { Fetcher, fetcherLookup, FetcherResponse } from './fetchers'
import { fetchMetadata, fetchMimeType } from './utils/fetch'
import { getIPFSUrl } from './utils/ipfs'
import { Parser, parserLookup } from './parsers'

export interface TokenPKDto {
  networkId: number
  tokenAddress: string
  tokenId: string
}

export interface NftMetadata extends TokenPKDto {
  metadata: any

  name?: string
  description?: string

  ownerAddress: string
  creatorAddress?: string

  tokenURI: string
  tokenURL: string
  tokenURLMimeType: string

  contentURL?: string
  contentURLMimeType?: string

  imageURL?: string
  imageURLMimeType?: string

  externalLink?: string

  attributes?: Record<string, any>[]
}

export enum Network {
  MAINNET = 1,
  RINKEBY = 4,
}

export type AgentNetworkConfiguration = {
  [key: number]: JsonRpcProvider
}

export type AgentConfiguration = {
  ipfsGateway?: string
  fetchTimeout?: number
  providers: AgentNetworkConfiguration
  parsers?: {
    [key: string]: Parser
  }
  fetchers?: {
    [key: string]: Fetcher
  }
}

export type TokenContractData = FetcherResponse & TokenPKDto & Record<any, any>
export type TokenData = { metadata: Record<any, any>; contentType: string }

export class Agent {
  constructor(private readonly options: AgentConfiguration) {}

  private getProviderForNetwork(number: Network): JsonRpcProvider {
    const provider = this.options.providers?.[number]
    if (!provider) {
      throw new Error('No provider for network')
    }
    return provider
  }

  public async supportedInterfaces(networkId: Network, tokenAddress: string) {
    const provider = this.getProviderForNetwork(networkId)
    return getSupportedInterfaces(provider, tokenAddress)
  }

  public async fetchContractData(
    networkId: Network,
    tokenAddress: string,
    tokenId: string,
  ) {
    const provider = this.getProviderForNetwork(networkId)
    const { erc721, erc721Metadata, erc721Enumerable } =
      await this.supportedInterfaces(networkId, tokenAddress)

    if (!erc721) {
      throw new Error(
        `${tokenAddress} on network: ${networkId} does not support ERC721 standard`,
      )
    }

    const erc721Contract = Erc721Factory.connect(tokenAddress, provider)
    const ownerAddress = await fetchOwnerOf(
      erc721Contract,
      tokenId,
      // Can catch if contract can make a total supply call
      // to handle open zeppelin burn
      erc721Enumerable,
    )

    let tokenURI: string | undefined
    if (erc721Metadata) {
      tokenURI = await erc721Contract.tokenURI(tokenId)
    }

    const baseData = {
      networkId,
      tokenAddress,
      tokenId,
      tokenURI,
      ownerAddress,
    }

    // bespoke fetches for other underlying data
    const fetcher = fetcherLookup(tokenAddress, this.options.fetchers)
    if (fetcher) {
      const data = await fetcher({
        provider,
        tokenAddress,
        tokenId,
      })

      return {
        ...baseData,
        ...data,
      }
    }

    return baseData
  }

  public async parseMetadata(
    contractData: TokenContractData,
    tokenData: TokenData,
  ) {
    const metadata = tokenData.metadata

    let meta: Partial<NftMetadata> = {}

    if (contractData.tokenURI) {
      meta.tokenURL = getIPFSUrl(
        contractData.tokenURI,
        this.options.ipfsGateway,
      )
      meta.tokenURLMimeType = tokenData.contentType
    }

    if (metadata.image) {
      meta.imageURL = getIPFSUrl(metadata.image, this.options.ipfsGateway)
      meta.contentURL = meta.imageURL
    }

    if (metadata.animation_url) {
      meta.contentURL = getIPFSUrl(
        metadata.animation_url,
        this.options.ipfsGateway,
      )
    }

    const {
      name,
      description,
      attributes,
      traits,
      external_url: externalURL,
      mimeType,
    } = metadata

    if (meta.contentURL) {
      meta.contentURLMimeType = await fetchMimeType(
        meta.contentURL,
        {
          timeout: this.options.fetchTimeout,
        },
        mimeType,
      )
    }

    if (meta.imageURL && meta.imageURL !== meta.contentURL) {
      meta.imageURLMimeType = await fetchMimeType(meta.imageURL, {
        timeout: this.options.fetchTimeout,
      })
    } else {
      delete meta.imageURL
    }

    const baseMeta = {
      metadata,
      ...meta,
      ...(name && { name }),
      ...(description && { description }),
      ...(attributes && { attributes }),
      ...(traits && { attributes: traits }),
      ...(externalURL && { externalURL }),
    }

    // Return any extra fields unparseable by defaults
    // @TODO - @ethandaya move this behaviour to a dynamic registry
    const parser = parserLookup(contractData.tokenAddress, this.options.parsers)
    if (parser) {
      const meta = await parser({
        provider: this.getProviderForNetwork(contractData.networkId),
        contractData,
        tokenData,
        ipfsGateway: this.options.ipfsGateway,
        fetchTimeout: this.options.fetchTimeout,
        baseMeta,
      })
      return {
        ...baseMeta,
        ...meta,
      }
    }

    return baseMeta
  }

  public async fetchAndParseTokenData(
    networkId: number,
    tokenAddress: string,
    tokenId: string,
  ) {
    const contractData = await this.fetchContractData(
      networkId,
      tokenAddress,
      tokenId,
    )

    if (!contractData.tokenURI) {
      return { ...contractData }
    }

    const tokenData = await fetchMetadata(contractData.tokenURI, {
      timeout: this.options.fetchTimeout,
      ipfsGateway: this.options.ipfsGateway,
    })

    const metadata = await this.parseMetadata(contractData, tokenData)

    return {
      ...contractData,
      ...metadata,
    }
  }
}
