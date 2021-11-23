import {
  JsonRpcProvider,
  StaticJsonRpcProvider,
} from '@ethersproject/providers'
import { Networkish } from '@ethersproject/networks'
import { getAddress } from '@ethersproject/address'
import { Erc721Factory } from '@zoralabs/core/dist/typechain'

import {
  fetchMimeType,
  fetchURI,
  getAlternateContractCall,
  getIPFSUrl,
  getPrivateGateway,
  getStaticURI,
  getURIData,
} from './uri'
import { fetchOnChainData, normaliseURIData } from './metadata'
import {
  CLOUDFLARE_RPC_DEFAULT,
  IPFS_CLOUDFLARE_GATEWAY,
  IPFS_IO_GATEWAY,
} from './constants/providers'
import { Contract } from 'ethers'
import { normalizeTokenID1155 } from './utils/addresses'
import { ERC1155_TOKEN_TYPE, ERC721_TOKEN_TYPE } from './constants/token-types'

type AgentBaseOptions = {
  ipfsGatewayUrl?: string
  ipfsFallbackGatewayUrl?: string
  timeout?: number
}

type AgentProviderConnectionOptions = {
  network: Networkish
  networkUrl: string
} & AgentBaseOptions

type AgentProviderOptions = {
  provider: JsonRpcProvider
} & AgentBaseOptions

type AgentOptions = AgentProviderConnectionOptions | AgentProviderOptions

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

export class ChainFetchError extends Error {};

export class Agent {
  timeout: number
  ipfsGatewayUrl: string
  ipfsFallbackGatewayUrl: string
  provider: JsonRpcProvider

  constructor(options: AgentOptions) {
    if ('provider' in options) {
      this.provider = options.provider
    } else {
      this.provider = new StaticJsonRpcProvider(
        options.networkUrl || CLOUDFLARE_RPC_DEFAULT,
        options.network,
      )
    }
    this.ipfsGatewayUrl = options.ipfsGatewayUrl || IPFS_IO_GATEWAY
    this.ipfsFallbackGatewayUrl =
      options.ipfsFallbackGatewayUrl || IPFS_CLOUDFLARE_GATEWAY
    this.timeout = options.timeout || 40000
  }

  public async fetchTokenURI(tokenAddress: string, tokenId: string) {
    const staticURI = getStaticURI(
      this.provider.network.name,
      tokenAddress,
      tokenId,
    )
    if (staticURI) {
      return staticURI
    }
    const alternateMethod = await getAlternateContractCall(
      this.provider.network.name,
      tokenAddress,
      tokenId,
      this.provider,
    )
    if (alternateMethod) {
      return alternateMethod
    }

    try {
      const erc721Contract = Erc721Factory.connect(tokenAddress, this.provider)
      const uri = await erc721Contract.tokenURI(tokenId)
      return {
        uri,
        type: ERC721_TOKEN_TYPE,
      }
    } catch (e) {
      // if this fails, attempt 1155 fetch
    }
    try {
      const erc1155Contract = new Contract(
        tokenAddress,
        ['function uri(uint256 index) public view returns (string memory)'],
        this.provider,
      )
      let uri = await erc1155Contract.uri(tokenId)
      if (uri.includes('{id}')) {
        uri = uri.replace('{id}', normalizeTokenID1155(tokenId))
      }
      return { uri, type: ERC1155_TOKEN_TYPE }
    } catch (e) {
      // if this fails, fail function
    }
    throw new ChainFetchError('Cannot fetch uri from contract')
  }

  public async fetchURIData(
    tokenAddress: string,
    tokenId: string,
    tokenURI: string,
    ipfsGateway: string,
  ) {
    const alternateMethod = getURIData(
      this.provider.network.name,
      tokenAddress,
      tokenId,
    )
    if (alternateMethod) {
      return alternateMethod
    }
    const resp = await fetchURI(
      tokenURI,
      { timeout: this.timeout },
      ipfsGateway,
      this.ipfsFallbackGatewayUrl,
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
    uriData: any = {},
    ipfsGateway: string,
  ) {
    const onChainData = await fetchOnChainData(
      this.provider.network.name,
      tokenAddress,
      tokenId,
      this.provider,
    )
    const meta = normaliseURIData(this.provider.network.name, tokenAddress, {
      ...uriData,
      ...onChainData,
      ...(uriData?.mimeType && {
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
    try {
      const uriFetchResult = await this.fetchTokenURI(tokenAddress, tokenId)
      const { uri: tokenURI, type: tokenType } = uriFetchResult

      const ipfsGateway =
        getPrivateGateway(this.provider.network.name, tokenAddress) ||
        this.ipfsGatewayUrl

      const URIData = await this.fetchURIData(
        tokenAddress,
        tokenId,
        tokenURI,
        ipfsGateway,
      )
      // console.log('fetched uri data: ', { URIData })

      const metadata = await this.parseURIData(
        tokenAddress,
        tokenId,
        tokenURI,
        URIData,
        ipfsGateway,
      )
      // console.log('parsed metadata: ', { metadata })

      return {
        tokenId,
        tokenAddress,
        metadata: URIData,
        tokenURI,
        tokenType,
        ...metadata,
      }
    } catch (err) {
      if (err instanceof ChainFetchError) {
        throw new Error(
          `Failed to get tokenURI token: ${tokenAddress} is unsupported by @zoralabs/nft-metadata`,
        )
      }
      throw err;
    }
    // console.log('fetched uri: ', { tokenURI, tokenType })
  }
}
