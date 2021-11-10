import { JsonRpcProvider } from '@ethersproject/providers'

import {
  AUTOGLYPHS_TOKEN_ADDRESS,
  HASHMASKS_TOKEN_ADDRESS,
  LOOT_TOKEN_ADDRESS,
  WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS,
  ZORA_TOKEN_ADDRESS,
} from '../constants/addresses'
import { isAddressMatch } from '../utils/addresses'
import { fetchZoraMeta } from './zora'
import { fetchHashmaskMeta } from './hashmasks'
import { fetchLootMeta } from './loot'
import { fetchPunkAttributes } from './punks'
import { fetchAutoglyphsMeta } from './autoglyphs'

export function fetchOnChainData(
  networkName: string,
  tokenAddress: string,
  tokenId: string,
  provider: JsonRpcProvider,
) {
  if (isAddressMatch(networkName, tokenAddress, AUTOGLYPHS_TOKEN_ADDRESS)) {
    return fetchAutoglyphsMeta(tokenAddress, tokenId, provider)
  }
  if (isAddressMatch(networkName, tokenAddress, HASHMASKS_TOKEN_ADDRESS)) {
    return fetchHashmaskMeta(tokenAddress, tokenId, provider)
  }
  if (
    isAddressMatch(networkName, tokenAddress, WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS)
  ) {
    return fetchPunkAttributes(tokenAddress, tokenId, provider)
  }
  if (isAddressMatch(networkName, tokenAddress, ZORA_TOKEN_ADDRESS)) {
    return fetchZoraMeta(tokenAddress, tokenId, provider)
  }
  if (isAddressMatch(networkName, tokenAddress, LOOT_TOKEN_ADDRESS)) {
    return fetchLootMeta(tokenAddress, tokenId, provider)
  }
  return Promise.resolve({})
}
