import { defaultFetcher } from './defaultFetcher'
import { getAddress } from '@ethersproject/address'
import {
  DECENTRALAND_TOKEN_ADDRESS,
  HASHMASKS_TOKEN_ADDRESS,
  ZORA_TOKEN_ADDRESS,
} from '../constants'
import { fetchHashmasksContractData } from './hashmaskFetcher'
import { fetchDecentralandContractData } from './decentralandFetcher'
import { fetchZoraContractData } from './zoraFetcher'
import { JsonRpcProvider } from '@ethersproject/providers'

export interface FetcherConfig {
  provider: JsonRpcProvider
  contractAddress: string
  tokenId: string
}

export interface FetcherResponse {
  tokenURI: string
  ownerAddress: string
}

export type Fetcher = (config: FetcherConfig) => Promise<FetcherResponse>

// TODO - look at making lookup a registry instead
export function fetcherLookup(contractAddress: string): Fetcher {
  const safeAddress = getAddress(contractAddress)
  switch (safeAddress) {
    case DECENTRALAND_TOKEN_ADDRESS:
      return fetchDecentralandContractData
    case HASHMASKS_TOKEN_ADDRESS:
      return fetchHashmasksContractData
    case ZORA_TOKEN_ADDRESS:
      return fetchZoraContractData
    default:
      return defaultFetcher
  }
}
