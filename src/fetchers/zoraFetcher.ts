import { MediaFactory } from '@zoralabs/core/dist/typechain'
import { getAddress } from '@ethersproject/address'
import { FetcherConfig } from './index'

export async function fetchZoraContractData({
  contractAddress,
  provider,
  tokenId,
}: FetcherConfig) {
  const erc721Contract = MediaFactory.connect(contractAddress, provider)
  const promises = [
    erc721Contract.tokenMetadataURI(tokenId),
    erc721Contract.ownerOf(tokenId),
  ]
  const [tokenURI, ownerAddress] = await Promise.all(promises)

  return {
    tokenURI,
    ownerAddress: getAddress(ownerAddress),
  }
}
