import fetch from 'cross-fetch'
import { JsonRpcProvider } from '@ethersproject/providers'
import { getIPFSUrl } from '../utils/ipfs'

export async function parseGenericMetadata(
  _: JsonRpcProvider,
  __: string,
  ___: string,
  tokenURI: string,
) {
  const publicTokenURI = getIPFSUrl(tokenURI)
  const cloudflareIPFSURI = getIPFSUrl(tokenURI, 'https://cloudflare-ipfs.com')
  const resp = await fetch(cloudflareIPFSURI)
  const metadata = await resp.json()

  if (!metadata.image && !metadata.animation_url) {
    throw new Error(
      `Invalid metadata required content params from metadata missing`,
    )
  }

  const imageURI = getIPFSUrl(metadata.image)
  const animationURI = metadata?.animation_url
    ? getIPFSUrl(metadata.animation_url)
    : null

  const { name, description, attributes, external_url: externalURL } = metadata
  const contentURI = animationURI || imageURI

  return {
    metadata,
    tokenURI: publicTokenURI,
    contentURI,
    ...(name && { name }),
    ...(description && { description }),
    ...(attributes && { attributes }),
    ...(externalURL && { externalURL }),
  }
}
