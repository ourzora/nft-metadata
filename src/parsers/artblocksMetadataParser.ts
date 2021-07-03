import { JsonRpcProvider } from '@ethersproject/providers'
import { parseGenericMetadata } from './openseaMetadataParser'

export async function parseArtblocksMetadata(
  provider: JsonRpcProvider,
  ipfsBaseURL: string,
  contractAddress: string,
  tokenId: string,
  tokenURI: string,
) {
  const baseMeta = await parseGenericMetadata(
    provider,
    ipfsBaseURL,
    contractAddress,
    tokenId,
    tokenURI,
  )
  return {
    ...baseMeta,
    ...(baseMeta.metadata.traits && { attributes: baseMeta.metadata.traits }),
  }
}
