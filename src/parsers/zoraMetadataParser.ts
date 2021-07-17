import { getIPFSUrl, isValidURL } from '../utils/ipfs'
import { MediaFactory } from '@zoralabs/core/dist/typechain'
import { fetchMetadata, fetchMimeType } from '../utils/fetch'
import { ParserConfig, ParserResponse } from './index'

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

export async function parseZoraMetadata({
  fetchTimeout,
  provider,
  contractAddress,
  tokenId,
  tokenURI,
  ipfsBaseURL,
}: ParserConfig): Promise<ParserResponse> {
  const publicTokenURI = getIPFSUrl(tokenURI, ipfsBaseURL)
  const fetchURI = getIPFSUrl(tokenURI, ipfsBaseURL, true)

  if (isValidURL(fetchURI)) {
    const { metadata, contentType } = await fetchMetadata(fetchURI, {
      timeout: fetchTimeout,
    })

    const ZContract = MediaFactory.connect(contractAddress, provider)
    const contentURI = await ZContract.tokenURI(tokenId)
    const contentURL = getIPFSUrl(contentURI, ipfsBaseURL)
    const fetchContentURL = getIPFSUrl(contentURI, ipfsBaseURL, true)

    const translatedMeta = translateMetadataSchema(metadata)

    const { name, description, externalURL, mimeType, image } = translatedMeta

    const imageURL = image ? getIPFSUrl(image, ipfsBaseURL) : undefined
    const imageURLMimeType = imageURL
      ? await fetchMimeType(imageURL, {
          timeout: fetchTimeout,
        })
      : undefined

    const contentURLMimeType = mimeType
      ? mimeType
      : await fetchMimeType(fetchContentURL, {
          timeout: fetchTimeout,
        })

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
      ...(externalURL && { externalURL }),
    }
  }

  return {
    metadata: fetchURI,
    tokenURL: publicTokenURI,
    tokenURLMimeType: 'text/plain',
  }
}
