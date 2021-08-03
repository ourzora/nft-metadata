import { Erc721Factory } from '@zoralabs/core/dist/typechain'
import { getAddress } from '@ethersproject/address'
import { FetcherConfig } from './index'

export async function defaultFetcher({
  provider,
  tokenAddress,
  tokenId,
}: FetcherConfig) {
  const erc721Contract = Erc721Factory.connect(tokenAddress, provider)

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
