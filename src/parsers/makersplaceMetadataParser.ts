import { JsonRpcProvider } from '@ethersproject/providers'
import { getIPFSUrl } from '../utils/ipfs'
import { fetchMetadata } from '../utils/fetch'

export async function parseMakersplaceMetadata(
  _: JsonRpcProvider,
  __: string,
  ___: string,
  tokenURI: string,
) {
  const publicTokenURI = getIPFSUrl(
    tokenURI,
    'https://ipfsgateway.makersplace.com',
  )
  const metadata = await fetchMetadata(tokenURI)

  const imageURI = metadata.imageUrl
    ? getIPFSUrl(metadata.imageUrl, 'https://ipfsgateway.makersplace.com')
    : null

  const animationURI =
    metadata?.properties?.preview_media_file2 &&
    metadata?.properties?.preview_media_file2_type?.description === 'mp4'
      ? getIPFSUrl(
          metadata?.properties?.preview_media_file2.description,
          'https://ipfsgateway.makersplace.com',
        )
      : null

  const { name, description, attributes } = metadata
  const contentURI = animationURI || imageURI
  const previewURI = imageURI && animationURI ? imageURI : undefined

  return {
    metadata,
    tokenURI: publicTokenURI,
    contentURI,
    ...(previewURI && { previewURI }),
    ...(name && { name }),
    ...(description && { description }),
    ...(attributes && { attributes }),
  }
}
