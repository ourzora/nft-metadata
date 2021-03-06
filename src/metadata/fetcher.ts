import { JsonRpcProvider } from '@ethersproject/providers'

import {
  AUTOGLYPHS_TOKEN_ADDRESS,
  HASHMASKS_TOKEN_ADDRESS,
  LIL_NOUNS_TOKEN_ADDRESS,
  LOOT_TOKEN_ADDRESS,
  NOUNS_TOKEN_ADDRESS,
  PUNKS_DATA_CONTRACT,
  WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS,
  ZORA_TOKEN_ADDRESS,
} from '../constants/addresses'
import { isAddressMatch } from '../utils/addresses'
import { fetchZoraMeta } from './zora'
import { fetchHashmaskMeta } from './hashmasks'
import { fetchLootMeta } from './loot'
import { fetchPunkAttributes } from './punks'
import { fetchAutoglyphsMeta } from './autoglyphs'
import { fetchNounAttributes } from './nouns'

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
    isAddressMatch(networkName, tokenAddress, NOUNS_TOKEN_ADDRESS) ||
    isAddressMatch(networkName, tokenAddress, LIL_NOUNS_TOKEN_ADDRESS)
  ) {
    return fetchNounAttributes(tokenAddress, tokenId, provider)
  }
  if (
    isAddressMatch(networkName, tokenAddress, WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS)
  ) {
    const punksDataContract = (PUNKS_DATA_CONTRACT as any)[networkName]
    return fetchPunkAttributes(punksDataContract, tokenId, provider)
  }
  if (isAddressMatch(networkName, tokenAddress, ZORA_TOKEN_ADDRESS)) {
    return fetchZoraMeta(tokenAddress, tokenId, provider)
  }
  if (isAddressMatch(networkName, tokenAddress, LOOT_TOKEN_ADDRESS)) {
    return fetchLootMeta(tokenAddress, tokenId, provider)
  }
  return Promise.resolve({})
}
