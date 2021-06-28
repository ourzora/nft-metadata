import { JsonRpcProvider } from '@ethersproject/providers'
import { parseGenericMetadata } from './openseaMetadataParser'

export async function parseArtblocksMetadata(
  provider: JsonRpcProvider,
  contractAddress: string,
  tokenId: string,
  tokenURI: string,
) {
  const baseMeta = await parseGenericMetadata(
    provider,
    contractAddress,
    tokenId,
    tokenURI,
  )
  return {
    ...baseMeta,
    ...(baseMeta.metadata.traits && { attributes: baseMeta.metadata.traits }),
  }
}
