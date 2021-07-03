import { JsonRpcProvider } from '@ethersproject/providers'
import { getIPFSUrl } from '../utils/ipfs'
import { fetchMetadata, fetchMimeType } from '../utils/fetch'

export async function parseMakersplaceMetadata(
  _: JsonRpcProvider,
  __: string,
  ___: string,
  ____: string,
  tokenURI: string,
) {
  const publicTokenURI = getIPFSUrl(
    tokenURI,
    'https://ipfsgateway.makersplace.com',
  )
  const metadata = await fetchMetadata(tokenURI)

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
  const previewURL = imageURI && animationURI ? imageURI : undefined

  const contentURLMimeType = animationURI
    ? 'video/mp4'
    : await fetchMimeType(contentURL)
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
  }
}
