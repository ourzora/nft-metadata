import { getIPFSUrl } from './ipfs'
import fetch from 'cross-fetch'

export async function fetchMetadata(uri: string) {
  const cloudflareIPFSURI = getIPFSUrl(uri, 'https://cloudflare-ipfs.com')
  const resp = await fetch(cloudflareIPFSURI)
  const contentType = resp.headers.get('content-type')
  if (
    !contentType ||
    (!contentType.includes('text/plain') &&
      !contentType.includes('application/json') &&
      !contentType.includes('application/ld+json'))
  ) {
    const errMessage = `Failed to fetch mimetype for uri: ${uri} as content-type is not valid`
    console.error(errMessage)
    throw new Error(errMessage)
  }

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
