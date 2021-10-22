import {
  FOUNDATION_TOKEN_ADDRESS,
  MAKERSPLACE_TOKEN_ADDRESS,
} from '../constants'

export const IPFS_IO_GATEWAY = 'https://gateway.ipfs.io'

const IPFSGatewayTools = require('@pinata/ipfs-gateway-tools/dist/node')
const gatewayTools = new IPFSGatewayTools()

export function isIPFS(uri: string) {
  const result = gatewayTools.containsCID(uri)

  // TODO - this lib is not working right so hack for now
  return result.containsCid && (uri.includes('/ipfs/') || hasIpfsPrefix(uri))
}

export function hasIpfsPrefix(uri: string) {
  return uri.startsWith('ipfs://')
}

export function getIPFSUrl(uri: string, gateway: string) {
  if (isIPFS(uri)) {
    return gatewayTools.convertToDesiredGateway(uri, gateway)
  }
  return uri
}

export function getPrivateGateway(tokenAddress: string) {
  switch (tokenAddress) {
    case MAKERSPLACE_TOKEN_ADDRESS:
      return 'https://ipfsgateway.makersplace.com'
    case FOUNDATION_TOKEN_ADDRESS:
      return 'https://ipfs.foundation.app'
    default:
      return
  }
}
