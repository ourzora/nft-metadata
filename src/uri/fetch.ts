import { getIPFSUrl, isIPFS } from './ipfs'
import axios from 'axios'
import { IPFS_IO_GATEWAY } from 'src/constants/ipfs'

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

export function parseDataUri(uri: string) {
  const commaIndex = uri.indexOf(',')
  if (commaIndex === -1) {
    return undefined
  }

  const mimeData = uri.substr(0, commaIndex + 1).match(/^data:([^;,]+)(.+)$/)

  if (!mimeData || !mimeData[1]) {
    return undefined
  }
  const data = uri.substr(commaIndex + 1)
  let body = data
  if (mimeData.length > 2 && mimeData[2]?.includes('base64')) {
    body = Buffer.from(data, 'base64').toString('utf-8')
  }
  if (body.includes('%')) {
    body = decodeURIComponent(body)
  }
  return {
    body,
    mime: mimeData[1],
  }
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

export async function fetchWithRetries(
  resource: string,
  options: FetchOptions = {},
  maxRetries = 5,
) {
  let retries = 0
  do {
    try {
      const response = await fetchWithTimeout(resource, options)
      return response
    } catch (e) {
      retries++
    }
  } while (retries < maxRetries)
  throw new Error(
    `Exhausted retries attempting to fetch from resource: ${resource}`,
  )
}

export async function fetchIPFSWithTimeout(
  uri: string,
  options: FetchOptions,
  gateway: string,
) {
  const tokenURL = getIPFSUrl(uri, gateway)
  return fetchWithRetries(tokenURL, options)
}

async function multiAttemptIPFSFetch(
  uri: string,
  options: FetchOptions,
  ipfsGateway?: string,
) {
  if (isValidHttpUrl(uri)) {
    try {
      return await fetchWithRetries(uri, options)
    } catch (e) {
      console.warn('Failed on https fetch')
    }
  }

  try {
    return await fetchIPFSWithTimeout(uri, options, IPFS_IO_GATEWAY)
  } catch (e) {
    console.warn('Failed on initial fetch')
    if (ipfsGateway) {
      return await fetchIPFSWithTimeout(uri, options, ipfsGateway)
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
    const resp = await fetchWithRetries(uri, options)
    return resp?.data
  }

  const inlineJsonBody = parseDataUri(uri)
  if (inlineJsonBody && inlineJsonBody.mime.startsWith('application/json')) {
    return JSON.parse(inlineJsonBody.body)
  }

  return
}

export async function fetchMimeType(
  uri: string,
  { timeout }: FetchOptions = {},
  defaultType?: string,
): Promise<string | undefined> {
  if (uri.startsWith('data:')) {
    const parsedUri = parseDataUri(uri)
    if (parsedUri) {
      return parsedUri.mime
    }
    throw new Error('Cannot parse data uri')
  }
  // TODO(iain): Change include to endsWith
  if (uri.includes('.jpeg') || uri.includes('.jpg')) {
    return 'image/jpeg'
  }
  if (uri.includes('.png')) {
    return 'image/png'
  }
  try {
    const resp = await fetchWithRetries(uri, {
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
