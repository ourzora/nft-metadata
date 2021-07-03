import { getIPFSUrl } from './ipfs'
import fetch from 'cross-fetch'

export async function fetchMetadata(uri: string) {
  const cloudflareIPFSURI = getIPFSUrl(uri, 'https://cloudflare-ipfs.com')
  const resp = await fetch(cloudflareIPFSURI)
  return resp.json()
}

export async function fetchMimeType(uri: string) {
  try {
    const resp = await fetch(uri, { method: 'HEAD' })
    return resp.headers.get('content-type')
  } catch (e) {
    console.error(
      `Failed to fetch mimetype for uri: ${uri} because: ${
        e?.message || 'Unknown Error occured'
      }`,
    )
    return
  }
}
