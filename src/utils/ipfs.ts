export const IPFS_IO_GATEWAY = 'https://ipfs.io'

export function isRawIPFSUrl(url: string): boolean {
  return url.startsWith('ipfs://')
}

export function getIPFSUrl(url: string, basePath: string = IPFS_IO_GATEWAY) {
  if (isRawIPFSUrl(url)) {
    return url.replace(
      'ipfs://',
      url.includes('/ipfs/') ? basePath + '/' : basePath + '/ipfs/',
    )
  }
  return url
}
