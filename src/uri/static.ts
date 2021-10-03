import {
  BLITMAP_TOKEN_ADDRESS,
  BLITNAUT_TOKEN_ADDRESS,
  DECENTRALAND_TOKEN_ADDRESS,
  HASHMASKS_TOKEN_ADDRESS,
  WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS,
} from '../constants'

export function getStaticURI(tokenAddress: string, tokenId: string) {
  switch (tokenAddress) {
    case WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS:
      return `https://wrappedpunks.com:3000/api/punks/metadata/${tokenId}`
    case BLITMAP_TOKEN_ADDRESS:
      return `https://api.blitmap.com/v1/metadata/${tokenId}`
    case BLITNAUT_TOKEN_ADDRESS:
      return `https://blitnauts.blitmap.com/api/v1/metadata/${tokenId}`
    case DECENTRALAND_TOKEN_ADDRESS:
      return `https://api.decentraland.org/v2/contracts/${tokenAddress.toLowerCase()}/tokens/${tokenId}`
    case HASHMASKS_TOKEN_ADDRESS:
      return `https://hashmap.azurewebsites.net/getMask/${tokenId}`
    default:
      return
  }
}
