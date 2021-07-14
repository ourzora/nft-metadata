import { getIPFSUrl } from '../utils/ipfs'
import { fetchMetadata, fetchMimeType } from '../utils/fetch'
import { ParserConfig } from './index'

export async function parseMakersplaceMetadata({
  tokenURI,
  fetchTimeout,
}: ParserConfig) {
  const publicTokenURI = getIPFSUrl(
    tokenURI,
    'https://ipfsgateway.makersplace.com',
  )
  const { metadata, contentType } = await fetchMetadata(tokenURI, {
    timeout: fetchTimeout,
  })

  if (!metadata.imageUrl) {
    throw new Error(
      `Invalid metadata required imageUrl key from metadata missing`,
    )
  }

  const imageURI = getIPFSUrl(
    metadata.imageUrl,
    'https://ipfsgateway.makersplace.com',
  )

  const animationURI =
    metadata?.properties?.preview_media_file2 &&
    metadata?.properties?.preview_media_file2_type?.description === 'mp4'
      ? getIPFSUrl(
          metadata?.properties?.preview_media_file2.description,
          'https://ipfsgateway.makersplace.com',
        )
      : null

  const { name, description, attributes } = metadata
  const contentURL = animationURI || imageURI
  const imageURL = imageURI && animationURI ? imageURI : undefined

  const contentURLMimeType = animationURI
    ? 'video/mp4'
    : await fetchMimeType(contentURL, { timeout: fetchTimeout })
  const imageURLMimeType = imageURL
    ? await fetchMimeType(imageURL, { timeout: fetchTimeout })
    : undefined

  return {
    metadata,
    tokenURL: publicTokenURI,
    tokenURLMimeType: contentType,
    contentURL,
    contentURLMimeType,
    ...(imageURL && { imageURL }),
    ...(imageURLMimeType && { imageURLMimeType }),
    ...(name && { name }),
    ...(description && { description }),
    ...(attributes && { attributes }),
  }
}
