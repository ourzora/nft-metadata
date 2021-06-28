import { JsonRpcProvider } from '@ethersproject/providers'
import { getIPFSUrl } from '../utils/ipfs'
import { MediaFactory } from '@zoralabs/core/dist/typechain'
import { fetchMetadata } from '../utils/fetch'

export async function parseZoraMetadata(
  provider: JsonRpcProvider,
  contractAddress: string,
  tokenId: string,
  tokenURI: string,
) {
  const publicTokenURI = getIPFSUrl(tokenURI)
  const metadata = await fetchMetadata(tokenURI)

  const ZContract = MediaFactory.connect(contractAddress, provider)
  const contentURI = await ZContract.tokenURI(tokenId)

  const { name, description, externalURL } = metadata

  return {
    metadata,
    tokenURI: publicTokenURI,
    contentURI,
    ...(name && { name }),
    ...(description && { description }),
    ...(externalURL && { externalURL }),
  }
}
