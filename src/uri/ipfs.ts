import { isAddressMatch } from 'src/utils/addresses'
import {
  FOUNDATION_TOKEN_ADDRESS,
  MAKERSPLACE_TOKEN_ADDRESS,
  ZORA_TOKEN_ADDRESS,
} from '../constants/addresses'

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

export function getPrivateGateway(chainName: string, tokenAddress: string) {
  if (isAddressMatch(chainName, tokenAddress, MAKERSPLACE_TOKEN_ADDRESS)) {
    return 'https://ipfsgateway.makersplace.com'
  }
  if (isAddressMatch(chainName, tokenAddress, FOUNDATION_TOKEN_ADDRESS)) {
    return 'https://ipfs.foundation.app'
  }
  if (isAddressMatch(chainName, tokenAddress, ZORA_TOKEN_ADDRESS)) {
    return 'https://zora-prod.mypinata.cloud'
  }
  return
}
