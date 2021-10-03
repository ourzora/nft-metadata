import AbortController from 'node-abort-controller'
import fetch from 'cross-fetch'
import { getIPFSUrl, IPFS_IO_GATEWAY, isIPFS } from './ipfs'

export function isValidHttpUrl(uri: string) {
  try {
    let url = new URL(uri)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch (_) {
    return false
  }
}

export function isDataURI(uri: string) {
  return uri.substring(0, 29) === 'data:application/json;base64,'
}

export type FetchOptions = RequestInit & { timeout?: number }

export async function fetchWithTimeout(
  resource: string,
  options: FetchOptions = {},
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

export async function fetchIPFSWithTimeout(
  uri: string,
  options: FetchOptions,
  gateway: string,
) {
  const tokenURL = getIPFSUrl(uri, gateway)
  return fetchWithTimeout(tokenURL, options)
}

export function parseDataURI(uri: string) {
  const json = Buffer.from(uri.substring(29), 'base64').toString()
  return JSON.parse(json)
}

async function multiAttemptIPFSFetch(
  uri: string,
  options: FetchOptions,
  ipfsGateway?: string,
) {
  if (isValidHttpUrl(uri)) {
    try {
      const resp = await fetchWithTimeout(uri, options)
      return resp
    } catch (e) {
      console.warn('Failed on initial fetch')
    }
  }

  try {
    const resp = await fetchIPFSWithTimeout(uri, options, IPFS_IO_GATEWAY)
    return resp
  } catch (e) {
    console.warn('Failed on secondary fetch')
    if (ipfsGateway) {
      const resp = await fetchIPFSWithTimeout(uri, options, ipfsGateway)
      return resp
    } else {
      throw e
    }
  }
}

export async function fetchURI(
  uri: string,
  options: FetchOptions,
  ipfsGateway?: string,
) {
  if (isIPFS(uri)) {
    const resp = await multiAttemptIPFSFetch(uri, options, ipfsGateway)
    return resp.json()
  }

  if (isValidHttpUrl(uri)) {
    const resp = await fetchWithTimeout(uri, options)
    return resp.json()
  }

  if (isDataURI(uri)) {
    return parseDataURI(uri)
  }

  return
}

export function getDataURIMimeType(uri: string) {
  return uri.substring(uri.indexOf(':') + 1, uri.indexOf(';'))
}

export async function fetchMimeType(
  uri: string,
  { timeout }: FetchOptions = {},
  defaultType?: string,
): Promise<string | undefined> {
  if (uri.includes('data:')) {
    return getDataURIMimeType(uri)
  }
  try {
    const resp = await fetchWithTimeout(uri, {
      method: 'HEAD',
      timeout,
    })
    return resp.headers.get('content-type') || undefined
  } catch (e) {
    console.warn(
      `Failed to fetch mimetype for uri: ${uri} because: ${
        e?.message || 'Unknown Error occurred'
      }`,
    )
    return defaultType
  }
}
