import { getIPFSUrl } from '../utils/ipfs'
import { ParserConfig } from './index'
import { NftMetadata } from '../agent'
import { fetchMimeType } from '../utils/fetch'

export async function parseMakersplaceMetadata(config: ParserConfig) {
  const { ipfsGateway, baseMeta, fetchTimeout } = config
  const { tokenURL, metadata } = baseMeta
  if (!tokenURL || !metadata) {
    throw new Error('Markersplace parser expects metadata & tokenURI')
  }

  let meta: Partial<NftMetadata> = {}

  if (metadata.imageUrl) {
    meta.imageURL = getIPFSUrl(metadata.imageUrl, ipfsGateway)
    meta.contentURL = meta.imageURL
  }

  // TODO - this sucks get makersplace to run their "rules of metadata"
  const animationURI =
    metadata?.properties?.preview_media_file2 &&
    metadata?.properties?.preview_media_file2_type?.description === 'mp4'
      ? metadata?.properties?.preview_media_file2.description
      : undefined

  if (animationURI) {
    meta.contentURL = getIPFSUrl(animationURI, ipfsGateway)
  }

  /*
   * TODO - this should almost definitely not be duplicated, but thoughts on
   *  where we choose to inject manual / special case parsers
   */
  if (meta.contentURL) {
    meta.contentURLMimeType = await fetchMimeType(meta.contentURL, {
      timeout: fetchTimeout,
    })
  }

  if (meta.imageURL && meta.imageURL !== meta.contentURL) {
    meta.imageURLMimeType = await fetchMimeType(meta.imageURL, {
      timeout: fetchTimeout,
    })
  } else {
    delete meta.imageURL
  }

  return meta
}
