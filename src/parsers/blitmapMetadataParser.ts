import { ParserConfig, ParserResponse } from './index'
import { NftMetadata } from '../agent'
import { Contract } from '@ethersproject/contracts'

export async function blitmapMetadataParser(
  config: ParserConfig,
): Promise<ParserResponse> {
  const { baseMeta, contractData, provider } = config
  const { tokenId, tokenAddress } = contractData

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

  return {
    ...baseMeta,
    imageURL: baseMeta.contentURL,
    imageURLMimeType: baseMeta.contentURLMimeType,
    ...meta,
  }
}
