import { MediaFactory } from '@zoralabs/core/dist/typechain'
import { FetcherConfig } from './index'

export async function fetchZoraContractData({
  provider,
  tokenAddress,
  tokenId,
}: FetcherConfig) {
  const erc721Contract = MediaFactory.connect(tokenAddress, provider)
  const tokenURI = await erc721Contract.tokenMetadataURI(tokenId)
  const contentURI = await erc721Contract.tokenURI(tokenId)
  const minterAddress = await erc721Contract.tokenCreators(tokenId)

  return {
    tokenURI,
    contentURI,
    minterAddress,
  }
}
