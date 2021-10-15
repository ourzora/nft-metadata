import { getIPFSUrl, IPFS_IO_GATEWAY, isIPFS } from './ipfs'
import parseDataURL from 'data-urls'
import axios from 'axios'

export function isValidHttpUrl(uri: string) {
  try {
    let url = new URL(uri)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch (_) {
    return false
  }
}

export function forceHttps(source: string) {
  return source.replace('http://', 'https://')
}

export function parseJSONDataURI(uri: string) {
  const parsedUrl = parseDataURL(uri)
  if (parsedUrl?.mimeType.toString().startsWith('application/json')) {
    const json = Buffer.from(parsedUrl.body).toString('utf-8')
    try {
      return JSON.parse(json);
    } catch {
      return undefined;
    }
  }
  return undefined
}

export type FetchOptions = RequestInit & { timeout?: number }

export async function fetchWithTimeout(
  resource: string,
  options: FetchOptions = {},
) {
  const httpsUrl = forceHttps(resource)
  return axios.get(httpsUrl, {
    timeout: options.timeout,
  })
}

export async function fetchIPFSWithTimeout(
  uri: string,
  options: FetchOptions,
  gateway: string,
) {
  const tokenURL = getIPFSUrl(uri, gateway)
  return fetchWithTimeout(tokenURL, options)
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
      console.warn('Failed on https fetch')
    }
  }

  try {
    const resp = await fetchIPFSWithTimeout(uri, options, IPFS_IO_GATEWAY)
    return resp
  } catch (e) {
    console.warn('Failed on initial fetch')
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
    return resp?.data
  }

  if (isValidHttpUrl(uri)) {
    const resp = await fetchWithTimeout(uri, options)
    return resp?.data
  }

  const inlineJsonBody = parseJSONDataURI(uri)
  if (inlineJsonBody) {
    return inlineJsonBody
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
  if (uri.includes('.jpeg') || uri.includes('.jpg')) {
    return 'image/jpeg'
  }
  if (uri.includes('.png')) {
    return 'image/png'
  }
  try {
    const resp = await fetchWithTimeout(uri, {
      method: 'HEAD',
      timeout,
    })
    return resp.headers['content-type'] || undefined
  } catch (e: any) {
    console.warn(
      `Failed to fetch mimetype for uri: ${uri} because: ${
        e?.message || 'Unknown Error occurred'
      }`,
    )
    return defaultType
  }
}
