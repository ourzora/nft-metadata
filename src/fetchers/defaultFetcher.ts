import { Erc721Factory } from '@zoralabs/core/dist/typechain'
import { getAddress } from '@ethersproject/address'
import { JsonRpcProvider } from '@ethersproject/providers'

export async function fetchUnderlyingContractData(
  provider: JsonRpcProvider,
  contractAddress: string,
  tokenId: string,
) {
  const erc721Contract = Erc721Factory.connect(contractAddress, provider)

  const promises = [
    erc721Contract.tokenURI(tokenId),
    erc721Contract.ownerOf(tokenId),
  ]

  const [tokenURI, ownerAddress] = await Promise.all(promises)

  return {
    tokenURI,
    ownerAddress: getAddress(ownerAddress),
  }
}
