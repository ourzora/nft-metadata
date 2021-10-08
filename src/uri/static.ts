import {
  BLITNAUT_TOKEN_ADDRESS,
  DECENTRALAND_TOKEN_ADDRESS,
  HASHMASKS_TOKEN_ADDRESS,
  WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS,
} from '../constants'

export function getStaticURI(tokenAddress: string, tokenId: string) {
  switch (tokenAddress) {
    case WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS:
      return `https://wrappedpunks.com:3000/api/punks/metadata/${tokenId}`
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

export async function getURIData(tokenAddress: string, tokenId: string) {
  switch (tokenAddress) {
    case WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS:
      return Promise.resolve({
        title: `W#${tokenId}`,
        name: `W#${tokenId}`,
        description:
          'This Punk was wrapped using Wrapped Punks contract, accessible from https://wrappedpunks.com',
        image: `https://wrappedpunks.com:3000/images/punks/${tokenId}.png`,
        external_url: 'https://wrappedpunks.com',
      })
    default:
      return
  }
}
