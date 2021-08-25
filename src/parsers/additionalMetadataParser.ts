import { getIPFSUrl } from '../utils/ipfs'
import { ParserConfig, ParserResponse } from './index'
import { NftMetadata } from '../agent'
import { fetchMimeType } from '../utils/fetch'

export function translateMetadataSchema(schema: any) {
  if ('body' in schema) {
    return {
      origin: 'catalog-20210202',
      version: 'zora-20210604',
      name: schema.body.title,
      description: schema.body.notes || '',
      mimeType: schema.body.mimeType,
      image: !schema.body?.artwork?.isNft
        ? schema.body?.artwork?.info?.uri
        : undefined,
      external_url: 'https://catalog.works',
      ...schema,
    }
  }

  return schema
}

export async function additionalMetadataParser(
  config: ParserConfig,
): Promise<ParserResponse> {
  const { ipfsGateway, baseMeta, fetchTimeout, contractData } = config
  const { contentURI } = contractData
  const { tokenURL, metadata } = baseMeta

  if (!tokenURL || !contentURI || !metadata) {
    throw new Error('zora additional parser expects tokenURL & contentURI')
  }

  let meta: Partial<NftMetadata> = {}

  const translatedMeta = translateMetadataSchema(metadata)
  const {
    name,
    description,
    external_url: externalURL,
    image,
    mimeType,
  } = translatedMeta

  meta.contentURL = getIPFSUrl(contentURI, ipfsGateway)
  meta.contentURLMimeType = mimeType
    ? mimeType
    : await fetchMimeType(meta.contentURL, {
        timeout: fetchTimeout,
      })

  if (image) {
    meta.imageURL = getIPFSUrl(image, ipfsGateway)
  }

  if (meta.imageURL) {
    meta.imageURLMimeType = await fetchMimeType(meta.imageURL, {
      timeout: fetchTimeout,
    })
  }

  return {
    ...meta,
    ...(name && { name }),
    ...(description && { description }),
    ...(externalURL && { externalURL }),
  }
}
