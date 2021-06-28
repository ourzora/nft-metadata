import { fetchUnderlyingContractData } from './defaultFetcher'
import { getAddress } from '@ethersproject/address'
import {
  DECENTRALAND_TOKEN_ADDRESS,
  HASHMASKS_TOKEN_ADDRESS,
  ZORA_TOKEN_ADDRESS,
} from '../constants'
import { fetchHashmasksContractData } from './hashmaskFetcher'
import { fetchDecentralandContractData } from './decentralandFetcher'
import { fetchZoraContractData } from './zoraFetcher'

export function fetcherLookup(contractAddress: string) {
  const safeAddress = getAddress(contractAddress)
  switch (safeAddress) {
    case DECENTRALAND_TOKEN_ADDRESS:
      return fetchDecentralandContractData
    case HASHMASKS_TOKEN_ADDRESS:
      return fetchHashmasksContractData
    case ZORA_TOKEN_ADDRESS:
      return fetchZoraContractData
    default:
      return fetchUnderlyingContractData
  }
}
