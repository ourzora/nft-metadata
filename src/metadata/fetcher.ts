import {
  HASHMASKS_TOKEN_ADDRESS,
  LOOT_TOKEN_ADDRESS,
  ZORA_RINKEBY_TOKEN_ADDRESS,
  ZORA_TOKEN_ADDRESS,
} from '../constants'
import { fetchZoraMeta } from './zora'
import { fetchHashmaskMeta } from './hashmasks'
import { JsonRpcProvider } from '@ethersproject/providers'
import { fetchLootMeta } from './loot'

export function fetchOnChainData(
  tokenAddress: string,
  tokenId: string,
  provider: JsonRpcProvider,
) {
  switch (tokenAddress) {
    case HASHMASKS_TOKEN_ADDRESS:
      return fetchHashmaskMeta(tokenAddress, tokenId, provider)
    case ZORA_TOKEN_ADDRESS:
    case ZORA_RINKEBY_TOKEN_ADDRESS:
      return fetchZoraMeta(tokenAddress, tokenId, provider)
    case LOOT_TOKEN_ADDRESS:
      return fetchLootMeta(tokenAddress, tokenId, provider)
    default:
      return Promise.resolve({})
  }
}
