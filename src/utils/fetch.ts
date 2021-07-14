import fetch from 'cross-fetch'
import { getIPFSUrl } from './ipfs'
import { universalAtob } from './encoding'
import AbortController from 'node-abort-controller'

interface FetchOptions {
  timeout?: number
}

const jsonContentTypes = [
  'text/plain',
  'application/json',
  'application/ld+json',
]

async function fetchWithTimeout(
  resource: string,
  options: RequestInit & { timeout?: number } = {},
) {
  const { timeout = 10000 } = options

  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  })
  clearTimeout(id)
  return response
}

export function getDataURIMimeType(uri: string) {
  return uri.substring(uri.indexOf(':') + 1, uri.indexOf(';'))
}

export async function fetchMetadata(
  uri: string,
  { timeout }: FetchOptions = {},
) {
  // TODO - dont do dank shit at 2am
  if (uri.substring(0, 29) === 'data:application/json;base64,') {
    const json = universalAtob(uri.substring(29))
    return {
      metadata: JSON.parse(json),
      contentType: getDataURIMimeType(uri),
    }
  }

  const metaIPFSURI = getIPFSUrl(uri, 'https://gateway.ipfs.io')
  const resp = await fetchWithTimeout(metaIPFSURI, { timeout })
  const contentType = resp.headers.get('content-type')

  // TODO - idk id this is valid / we can bail / add config to not bail (not strict vs strict)
  if (!contentType) {
    throw new Error(
      `Failed to fetch mimetype for uri: ${uri} as content-type is not valid`,
    )
  }

  if (jsonContentTypes.some((ct) => contentType.includes(ct))) {
    const metadata = await resp.json()
    return { metadata, contentType }
  }

  if (resp.status !== 200) {
    throw new Error(
      `Invalid Response for uri: ${uri} received code: ${resp.status}`,
    )
  }

  return { metadata: resp.text(), contentType }
}

export async function fetchMimeType(
  uri: string,
  { timeout }: FetchOptions = {},
  defaultType?: string,
) {
  if (uri.includes('data:')) {
    return getDataURIMimeType(uri)
  }
  try {
    const resp = await fetchWithTimeout(uri, {
      method: 'HEAD',
      timeout,
    })
    return resp.headers.get('content-type')
  } catch (e) {
    console.error(
      `Failed to fetch mimetype for uri: ${uri} because: ${
        e?.message || 'Unknown Error occurred'
      }`,
    )
    return defaultType
  }
}
