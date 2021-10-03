import { NftMetadata } from '../agent'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'

export async function fetchBlitmapMeta(
  tokenAddress: string,
  tokenId: string,
  provider: JsonRpcProvider,
) {
  const BMContract = new Contract(
    tokenAddress,
    [
      'function tokenSvgDataOf(uint256 tokenId) public view returns (string memory)',
    ],
    provider,
  )
  const svg = await BMContract.tokenSvgDataOf(tokenId)
  let meta: Partial<NftMetadata> = {
    contentURL: svg,
    contentURLMimeType: 'image/svg+xml',
  }

  return meta
}
