import { Erc721Factory } from '@zoralabs/core/dist/typechain'
import { FetcherConfig } from './index'

const DECENTRALAND_API_BASE_URL = 'https://api.decentraland.org/v2'

export async function fetchDecentralandContractData({
  contractAddress,
  provider,
  tokenId,
}: FetcherConfig) {
  const erc721Contract = Erc721Factory.connect(contractAddress, provider)
  const ownerAddress = await erc721Contract.ownerOf(tokenId)
  return {
    tokenURI: `${DECENTRALAND_API_BASE_URL}/contracts/${contractAddress.toLowerCase()}/tokens/${tokenId}`,
    ownerAddress,
  }
}
