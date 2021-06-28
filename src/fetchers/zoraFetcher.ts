import { JsonRpcProvider } from '@ethersproject/providers'
import { MediaFactory } from '@zoralabs/core/dist/typechain'
import { getAddress } from '@ethersproject/address'

export async function fetchZoraContractData(
  provider: JsonRpcProvider,
  contractAddress: string,
  tokenId: string,
) {
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
