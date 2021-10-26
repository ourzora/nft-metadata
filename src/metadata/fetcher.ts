import { JsonRpcProvider } from '@ethersproject/providers'

import {
  AUTOGLYPHS_TOKEN_ADDRESS,
  HASHMASKS_TOKEN_ADDRESS,
  LOOT_TOKEN_ADDRESS,
  WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS,
  ZORA_RINKEBY_TOKEN_ADDRESS,
  ZORA_TOKEN_ADDRESS,
} from '../constants/addresses'
import { fetchZoraMeta } from './zora'
import { fetchHashmaskMeta } from './hashmasks'
import { fetchLootMeta } from './loot'
import { fetchPunkAttributes } from './punks'
import { fetchAutoglyphsMeta } from './autoglyphs'

export function fetchOnChainData(
  tokenAddress: string,
  tokenId: string,
  provider: JsonRpcProvider,
) {
  switch (tokenAddress) {
    case AUTOGLYPHS_TOKEN_ADDRESS:
      return fetchAutoglyphsMeta(tokenAddress, tokenId, provider)
    case HASHMASKS_TOKEN_ADDRESS:
      return fetchHashmaskMeta(tokenAddress, tokenId, provider)
    case WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS:
      return fetchPunkAttributes(tokenAddress, tokenId, provider)
    case ZORA_TOKEN_ADDRESS:
    case ZORA_RINKEBY_TOKEN_ADDRESS:
      return fetchZoraMeta(tokenAddress, tokenId, provider)
    case LOOT_TOKEN_ADDRESS:
      return fetchLootMeta(tokenAddress, tokenId, provider)
    default:
      return Promise.resolve({})
  }
}
