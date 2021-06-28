import { getIPFSUrl } from './ipfs'
import fetch from 'cross-fetch'

export async function fetchMetadata(uri: string) {
  const cloudflareIPFSURI = getIPFSUrl(uri, 'https://cloudflare-ipfs.com')
  const resp = await fetch(cloudflareIPFSURI)
  return resp.json()
}
