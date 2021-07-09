import { getIPFSUrl } from '../utils/ipfs'
import { fetchMetadata, fetchMimeType } from '../utils/fetch'
import { NftMetadata } from '../parser'
import { ParserConfig } from './index'

export async function parseGenericMetadata({
  fetchTimeout,
  ipfsBaseURL,
  tokenURI,
}: ParserConfig): Promise<NftMetadata> {
  const publicTokenURI = getIPFSUrl(tokenURI)
  const { metadata, contentType } = await fetchMetadata(tokenURI, {
    timeout: fetchTimeout,
  })

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

  const contentURLMimeType = await fetchMimeType(contentURL, {
    timeout: fetchTimeout,
  })
  const previewURLMimeType = previewURL
    ? await fetchMimeType(previewURL, {
        timeout: fetchTimeout,
      })
    : undefined

  return {
    metadata,
    tokenURL: publicTokenURI,
    tokenURLMimeType: contentType,
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
