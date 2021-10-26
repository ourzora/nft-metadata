import {
  AUTOGLYPHS_TOKEN_ADDRESS,
  DECENTRALAND_TOKEN_ADDRESS,
  HASHMASKS_TOKEN_ADDRESS,
  WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS,
} from '../constants/addresses'

export function getStaticURI(tokenAddress: string, tokenId: string) {
  switch (tokenAddress) {
    case DECENTRALAND_TOKEN_ADDRESS:
      return `https://api.decentraland.org/v2/contracts/${tokenAddress.toLowerCase()}/tokens/${tokenId}`
    case HASHMASKS_TOKEN_ADDRESS:
      return `https://hashmap.azurewebsites.net/getMask/${tokenId}`
    // since burned wrapped punks still have their metadata this is a no-op to prevent reverts.
    case WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS:
      return `data:application/json,{}`
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
    case AUTOGLYPHS_TOKEN_ADDRESS:
      return Promise.resolve({
        title: `Autoglyph #${tokenId}`,
        name: `Autoglyph #${tokenId}`,
        image: `https://www.larvalabs.com/autoglyphs/glyphimage?index=${tokenId}`,
        description:
          'Autoglyphs are the first “on-chain” generative art on the Ethereum blockchain. A completely self-contained mechanism for the creation and ownership of an artwork.',
        external_url: `https://www.larvalabs.com/autoglyphs/glyph?index=${tokenId}`,
      })
    default:
      return
  }
}
