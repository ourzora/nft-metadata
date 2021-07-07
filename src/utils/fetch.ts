import fetch from 'cross-fetch'
import { getIPFSUrl } from './ipfs'
import { universalAtob } from './encoding'

const jsonContentTypes = [
  'text/plain',
  'application/json',
  'application/ld+json',
]

export function getDataURIMimeType(uri: string) {
  return uri.substring(uri.indexOf(':') + 1, uri.indexOf(';'))
}

export async function fetchMetadata(uri: string) {
  if (uri.substring(0, 29) === 'data:application/json;base64,') {
    const json = universalAtob(uri.substring(29))
    return {
      metadata: JSON.parse(json),
      contentType: getDataURIMimeType(uri),
    }
  }

  const cloudflareIPFSURI = getIPFSUrl(uri, 'https://cloudflare-ipfs.com')
  const resp = await fetch(cloudflareIPFSURI)
  const contentType = resp.headers.get('content-type')

  if (!contentType) {
    const errMessage = `Failed to fetch mimetype for uri: ${uri} as content-type is not valid`
    console.error(errMessage)
    throw new Error(errMessage)
  }

  if (jsonContentTypes.some((ct) => contentType.includes(ct))) {
    const metadata = await resp.json()
    return { metadata, contentType }
  }

  return { metadata: resp.body, contentType }
}

export async function fetchMimeType(uri: string, defaultType?: string) {
  if (uri.includes('data:')) {
    return getDataURIMimeType(uri)
  }

  try {
    const resp = await fetch(uri, { method: 'HEAD' })
    return resp.headers.get('content-type')
  } catch (e) {
    console.error(
      `Failed to fetch mimetype for uri: ${uri} because: ${
        e?.message || 'Unknown Error occured'
      }`,
    )
    return defaultType
  }
}
