import { getIPFSUrl } from '../utils/ipfs'
import { MediaFactory } from '@zoralabs/core/dist/typechain'
import { fetchMetadata, fetchMimeType } from '../utils/fetch'
import { ParserConfig } from './index'

export async function parseZoraMetadata({
  provider,
  contractAddress,
  tokenId,
  tokenURI,
  ipfsBaseURL,
}: ParserConfig) {
  const publicTokenURI = getIPFSUrl(tokenURI, ipfsBaseURL)
  const fetchURI = getIPFSUrl(tokenURI, ipfsBaseURL, true)
  const metadata = await fetchMetadata(fetchURI)

  const ZContract = MediaFactory.connect(contractAddress, provider)
  const contentURI = await ZContract.tokenURI(tokenId)
  const contentURL = getIPFSUrl(contentURI, ipfsBaseURL)

  const { name, description, externalURL, mimeType } = metadata
  const contentURLMimeType = mimeType
    ? mimeType
    : await fetchMimeType(contentURL)

  return {
    metadata,
    tokenURL: publicTokenURI,
    contentURL,
    contentURLMimeType,
    ...(name && { name }),
    ...(description && { description }),
    ...(externalURL && { externalURL }),
  }
}
