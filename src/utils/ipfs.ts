import { URL } from 'url'
export const IPFS_REGEX = /.*?\/ipfs\/(.*?)/g
export const IPFS_IO_GATEWAY = 'https://gateway.ipfs.io'

export const isValidURL = (value: string) => {
  try {
    new URL(value)
    return true
  } catch (err) {
    return false
  }
}

export function forceHttps(url: string) {
  if (url.includes('http://')) {
    return url.replace('http://', 'https://')
  }
  return url
}

export function isRawIPFSUrl(url: string): boolean {
  return url.startsWith('ipfs://')
}

export function getIPFSUrl(
  rawUrl: string,
  basePath: string = IPFS_IO_GATEWAY,
  force?: boolean,
) {
  let url: string = rawUrl

  if (isRawIPFSUrl(rawUrl)) {
    url = rawUrl.replace(
      'ipfs://',
      rawUrl.includes('/ipfs/') ? basePath + '/' : basePath + '/ipfs/',
    )
  }

  if (force) {
    url = rawUrl.replace(IPFS_REGEX, basePath + '/ipfs/')
  }

  return forceHttps(url)
}
