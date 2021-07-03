import { JsonRpcProvider } from '@ethersproject/providers'
import { getIPFSUrl } from '../utils/ipfs'
import { MediaFactory } from '@zoralabs/core/dist/typechain'
import { fetchMetadata, fetchMimeType } from '../utils/fetch'

export async function parseZoraMetadata(
  provider: JsonRpcProvider,
  ipfsBaseURL: string,
  contractAddress: string,
  tokenId: string,
  tokenURI: string,
) {
  const publicTokenURI = getIPFSUrl(tokenURI, ipfsBaseURL)
  const metadata = await fetchMetadata(tokenURI)

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
