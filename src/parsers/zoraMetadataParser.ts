import { getIPFSUrl, isValidURL } from '../utils/ipfs'
import { MediaFactory } from '@zoralabs/core/dist/typechain'
import { fetchMetadata, fetchMimeType } from '../utils/fetch'
import { ParserConfig, ParserResponse } from './index'

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
    const fetchContentURL = getIPFSUrl(tokenURI, ipfsBaseURL, true)

    const { name, description, externalURL, mimeType } = metadata
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
