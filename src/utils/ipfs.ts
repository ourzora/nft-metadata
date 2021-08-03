import { URL } from 'url'
export const IPFS_REGEX = /.*?\/ipfs\/(.*?)/g
export const DWEB_GATEWAY = 'https://dweb.link'

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

export function getIPFSUrl(rawUrl: string, basePath: string = DWEB_GATEWAY) {
  let url: string = rawUrl

  if (isRawIPFSUrl(rawUrl)) {
    url = rawUrl.replace(
      'ipfs://',
      rawUrl.includes('/ipfs/') ? basePath + '/' : basePath + '/ipfs/',
    )
  }

  url = url.replace(IPFS_REGEX, basePath + '/ipfs/')

  return forceHttps(url)
}
