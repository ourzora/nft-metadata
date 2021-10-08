import { JsonRpcProvider } from '@ethersproject/providers'
import { Networkish } from '@ethersproject/networks'
import {
  fetchMimeType,
  fetchURI,
  getAlternateContractCall,
  getIPFSUrl,
  getPrivateGateway,
  getStaticURI,
  getURIData,
  IPFS_IO_GATEWAY,
} from './uri'
import { getAddress } from '@ethersproject/address'
import { Erc721Factory } from '@zoralabs/core/dist/typechain'
import { fetchOnChainData, normaliseURIData } from './metadata'

type AgentOptions = {
  network: Networkish
  networkUrl: string
  ipfsGatewayUrl?: string
  timeout?: number
}

export interface NftMetadata {
  tokenId: string
  tokenAddress: string
  metadata: any
  tokenURI: string
  tokenURL: string
  tokenURLMimeType: string
  name?: string
  description?: string
  contentURL?: string
  contentURLMimeType?: string
  imageURL?: string
  imageURLMimeType?: string
  externalLink?: string
  attributes?: Record<string, any>[]
}

export class Agent {
  timeout: number
  ipfsGatewayUrl: string
  provider: JsonRpcProvider

  constructor(options: AgentOptions) {
    this.provider = new JsonRpcProvider(options.networkUrl, options.network)
    this.ipfsGatewayUrl = options.ipfsGatewayUrl || IPFS_IO_GATEWAY
    this.timeout = options.timeout || 10000
  }

  public async fetchTokenURI(tokenAddress: string, tokenId: string) {
    const staticURI = getStaticURI(tokenAddress, tokenId)
    if (staticURI) {
      return staticURI
    }
    const alternateMethod = getAlternateContractCall(
      tokenAddress,
      tokenId,
      this.provider,
    )
    if (alternateMethod) {
      return alternateMethod
    }
    const contract = Erc721Factory.connect(tokenAddress, this.provider)
    try {
      return contract.tokenURI(tokenId)
    } catch (e) {
      return
    }
  }

  public async fetchURIData(
    tokenAddress: string,
    tokenId: string,
    tokenURI: string,
    ipfsGateway: string,
  ) {
    const alternateMethod = getURIData(tokenAddress, tokenId)
    if (alternateMethod) {
      return alternateMethod
    }
    const resp = await fetchURI(
      tokenURI,
      { timeout: this.timeout },
      ipfsGateway,
    )
    if (!resp) {
      throw new Error(`Failed to fetch uri data for token from: ${tokenURI}`)
    }
    return resp
  }

  private async parseURIData(
    tokenAddress: string,
    tokenId: string,
    tokenURI: string,
    uriData: any,
    ipfsGateway: string,
  ) {
    const onChainData = await fetchOnChainData(
      tokenAddress,
      tokenId,
      this.provider,
    )
    const meta = normaliseURIData(tokenAddress, {
      ...uriData,
      ...onChainData,
      ...(uriData.mimeType && {
        contentURLMimeType: uriData.mimeType,
      }),
    })

    if (meta.image) {
      meta.imageURL = getIPFSUrl(meta.image, ipfsGateway)
    }

    if (meta.animation_url) {
      meta.contentURL = getIPFSUrl(meta.animation_url, ipfsGateway)
    }

    if (!meta.contentURL && meta.imageURL) {
      meta.contentURL = meta.imageURL
    }

    if (meta.contentURL && !meta.contentURLMimeType) {
      meta.contentURLMimeType = await fetchMimeType(meta.contentURL, {
        timeout: this.timeout,
      })
    }

    if (meta.imageURL && !meta.imageURLMimeType) {
      meta.imageURLMimeType = await fetchMimeType(meta.imageURL, {
        timeout: this.timeout,
      })
    }

    const {
      name,
      description,
      attributes,
      external_url: externalURL,
      imageURL,
      imageURLMimeType,
      contentURL,
      contentURLMimeType,
    } = meta

    return {
      tokenURL: getIPFSUrl(tokenURI, ipfsGateway),
      tokenURLMimeType: 'application/json',
      ...(name && { name }),
      ...(description && { description }),
      ...(imageURL && { imageURL }),
      ...(imageURLMimeType && { imageURLMimeType }),
      ...(contentURL && { contentURL }),
      ...(contentURLMimeType && { contentURLMimeType }),
      ...(attributes && { attributes }),
      ...(externalURL && { externalURL }),
    }
  }

  public async fetchMetadata(
    rawAddress: string,
    tokenId: string,
  ): Promise<NftMetadata> {
    const tokenAddress = getAddress(rawAddress)
    const tokenURI = await this.fetchTokenURI(tokenAddress, tokenId)
    if (!tokenURI) {
      throw new Error(
        `Failed to get tokenURI token: ${tokenAddress} is unsupported by @zoralabs/nft-metadata`,
      )
    }
    console.log('fetched uri ', { tokenURI })
    const ipfsGateway = getPrivateGateway(tokenAddress) || this.ipfsGatewayUrl
    const URIData = await this.fetchURIData(
      tokenAddress,
      tokenId,
      tokenURI,
      ipfsGateway,
    )
    console.log('fetched uri data: ', { URIData })
    const metadata = await this.parseURIData(
      tokenAddress,
      tokenId,
      tokenURI,
      URIData,
      ipfsGateway,
    )
    console.log('parsed metada: ', { metadata })

    return {
      tokenId,
      tokenAddress,
      metadata: URIData,
      tokenURI,
      ...metadata,
    }
  }
}
