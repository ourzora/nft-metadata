import {
  BLITNAUT_TOKEN_ADDRESS,
  DECENTRALAND_TOKEN_ADDRESS,
  HASHMASKS_TOKEN_ADDRESS,
  WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS,
} from '../constants'

export function getStaticURI(tokenAddress: string, tokenId: string) {
  switch (tokenAddress) {
    case BLITNAUT_TOKEN_ADDRESS:
      return `https://blitnauts.blitmap.com/api/v1/metadata/${tokenId}`
    case DECENTRALAND_TOKEN_ADDRESS:
      return `https://api.decentraland.org/v2/contracts/${tokenAddress.toLowerCase()}/tokens/${tokenId}`
    case HASHMASKS_TOKEN_ADDRESS:
      return `https://hashmap.azurewebsites.net/getMask/${tokenId}`
    case WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS:
      // TODO(iain): Figure out why contract fails here
      return 'data:application/json,{}'
    default:
      return
  }
}

export function getURIData(tokenAddress: string, tokenId: string) {
  switch (tokenAddress) {
    case WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS:
      return Promise.resolve({
        title: `W#${tokenId}`,
        name: `W#${tokenId}`,
        description:
          'This Punk was wrapped using Wrapped Punks contract, accessible from https://wrappedpunks.com',
        external_url: `https://larvalabs.com/cryptopunks/details/${tokenId}`,
      })
    default:
      return
  }
}
