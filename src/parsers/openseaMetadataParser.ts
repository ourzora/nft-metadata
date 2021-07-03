import { JsonRpcProvider } from '@ethersproject/providers'
import { getIPFSUrl } from '../utils/ipfs'
import { fetchMetadata, fetchMimeType } from '../utils/fetch'
import { NftMetadata } from '../parser'

export async function parseGenericMetadata(
  _: JsonRpcProvider,
  ipfsBaseURL: string,
  __: string,
  ___: string,
  tokenURI: string,
): Promise<NftMetadata> {
  const publicTokenURI = getIPFSUrl(tokenURI)
  const metadata = await fetchMetadata(tokenURI)

  if (!metadata.image && !metadata.animation_url) {
    throw new Error(
      `Invalid metadata required content params from metadata missing`,
    )
  }

  const imageURI = getIPFSUrl(metadata.image, ipfsBaseURL)
  const animationURI = metadata?.animation_url
    ? getIPFSUrl(metadata.animation_url, ipfsBaseURL)
    : null

  const { name, description, attributes, external_url: externalURL } = metadata
  const contentURL = animationURI || imageURI
  const previewURL = imageURI && animationURI ? imageURI : undefined

  const contentURLMimeType = await fetchMimeType(contentURL)
  const previewURLMimeType = previewURL
    ? await fetchMimeType(previewURL)
    : undefined

  return {
    metadata,
    tokenURL: publicTokenURI,
    contentURL,
    contentURLMimeType,
    ...(previewURL && { previewURL }),
    ...(previewURLMimeType && { previewURLMimeType }),
    ...(name && { name }),
    ...(description && { description }),
    ...(attributes && { attributes }),
    ...(externalURL && { externalURL }),
  }
}
