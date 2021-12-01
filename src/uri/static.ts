import { isAddressMatch } from '../utils/addresses'
import {
  AUTOGLYPHS_TOKEN_ADDRESS,
  DECENTRALAND_TOKEN_ADDRESS,
  ENS_TOKEN_ADDRESS,
  FOUNDATION_TOKEN_ADDRESS,
  HASHMASKS_TOKEN_ADDRESS,
  WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS,
} from '../constants/addresses'
import { ERC721_TOKEN_TYPE } from '../constants/token-types'

export function getStaticURI(
  chainName: string,
  tokenAddress: string,
  tokenId: string,
) {
  if (isAddressMatch(chainName, tokenAddress, DECENTRALAND_TOKEN_ADDRESS)) {
    return {
      type: ERC721_TOKEN_TYPE,
      uri: `https://api.decentraland.org/v2/contracts/${tokenAddress.toLowerCase()}/tokens/${tokenId}`,
    }
  }
  if (isAddressMatch(chainName, tokenAddress, HASHMASKS_TOKEN_ADDRESS)) {
    return {
      type: ERC721_TOKEN_TYPE,
      uri: `https://hashmap.azurewebsites.net/getMask/${tokenId}`,
    }
  }
  if (isAddressMatch(chainName, tokenAddress, ENS_TOKEN_ADDRESS)) {
    let ensChainName = chainName
    if (ensChainName == 'homestead') {
      ensChainName = 'mainnet'
    }
    return {
      type: ERC721_TOKEN_TYPE,
      uri: `https://metadata.ens.domains/${ensChainName}/${tokenAddress.toLowerCase()}/${tokenId}/`,
    }
  }
  if (isAddressMatch(chainName, tokenAddress, FOUNDATION_TOKEN_ADDRESS)) {
    return {
      type: ERC721_TOKEN_TYPE,
      uri: `https://api.foundation.app/opensea/${tokenId}`,
    }
  }
  if (
    isAddressMatch(chainName, tokenAddress, WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS)
  ) {
    return {
      type: ERC721_TOKEN_TYPE,
      uri: `data:application/json,{}`,
    }
  }
  return
}

export function getURIData(
  chainName: string,
  tokenAddress: string,
  tokenId: string,
) {
  if (
    isAddressMatch(chainName, tokenAddress, WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS)
  ) {
    return Promise.resolve({
      title: `W#${tokenId}`,
      name: `W#${tokenId}`,
      description:
        'This Punk was wrapped using Wrapped Punks contract, accessible from https://wrappedpunks.com',
      external_url: `https://larvalabs.com/cryptopunks/details/${tokenId}`,
    })
  }
  if (isAddressMatch(chainName, tokenAddress, AUTOGLYPHS_TOKEN_ADDRESS)) {
    return Promise.resolve({
      title: `Autoglyph #${tokenId}`,
      name: `Autoglyph #${tokenId}`,
      image: `https://www.larvalabs.com/autoglyphs/glyphimage?index=${tokenId}`,
      description:
        'Autoglyphs are the first “on-chain” generative art on the Ethereum blockchain. A completely self-contained mechanism for the creation and ownership of an artwork.',
      external_url: `https://www.larvalabs.com/autoglyphs/glyph?index=${tokenId}`,
    })
  }
  return
}
