import { Erc721Factory } from '@zoralabs/core/dist/typechain'
import { FetcherConfig } from './index'

const DECENTRALAND_API_BASE_URL = 'https://api.decentraland.org/v2'

export async function fetchDecentralandContractData({
  tokenAddress,
  provider,
  tokenId,
}: FetcherConfig) {
  const erc721Contract = Erc721Factory.connect(tokenAddress, provider)
  const ownerAddress = await erc721Contract.ownerOf(tokenId)
  return {
    tokenURI: `${DECENTRALAND_API_BASE_URL}/contracts/${tokenAddress.toLowerCase()}/tokens/${tokenId}`,
    ownerAddress,
  }
}
