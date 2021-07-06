export const IPFS_REGEX = /.*?\/ipfs\/(.*?)/g
export const IPFS_IO_GATEWAY = 'https://ipfs.io'

export function isRawIPFSUrl(url: string): boolean {
  return url.startsWith('ipfs://')
}

export function getIPFSUrl(
  url: string,
  basePath: string = IPFS_IO_GATEWAY,
  force?: boolean,
) {
  if (isRawIPFSUrl(url)) {
    return url.replace(
      'ipfs://',
      url.includes('/ipfs/') ? basePath + '/' : basePath + '/ipfs/',
    )
  }

  if (force) {
    return url.replace(IPFS_REGEX, basePath + '/ipfs/')
  }

  return url
}
