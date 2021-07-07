import { MediaFactory } from '@zoralabs/core/dist/typechain'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { FetcherConfig } from './index'

export async function fetchZoraContractData({
  contractAddress,
  provider,
  tokenId,
}: FetcherConfig) {
  const erc721Contract = MediaFactory.connect(contractAddress, provider)
  const tokenURI = await erc721Contract.tokenMetadataURI(tokenId)

  try {
    const ownerAddress = await erc721Contract.ownerOf(tokenId)
    return {
      tokenURI,
      ownerAddress: getAddress(ownerAddress),
    }
  } catch (e) {
    const totalSupply = await erc721Contract.totalSupply()
    if (
      totalSupply.gte(tokenId) &&
      e.reason === 'ERC721: owner query for nonexistent token'
    ) {
      return {
        tokenURI,
        ownerAddress: getAddress(AddressZero),
      }
    }
    throw e
  }
}
