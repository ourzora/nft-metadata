import { Erc721Factory } from '@zoralabs/core/dist/typechain'
import { FetcherConfig } from './index'

const HASHMARKS_TOKEN_URI_BASE = 'https://hashmap.azurewebsites.net'

export async function fetchHashmasksContractData({
  tokenAddress,
  provider,
  tokenId,
}: FetcherConfig) {
  const erc721Contract = Erc721Factory.connect(tokenAddress, provider)
  const ownerAddress = await erc721Contract.ownerOf(tokenId)
  return {
    tokenURI: `${HASHMARKS_TOKEN_URI_BASE}/getMask/${tokenId}`,
    ownerAddress,
  }
}
