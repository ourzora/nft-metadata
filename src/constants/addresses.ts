import { media as ZORA_MEDIA_ADDRESS_MAINNET } from '@zoralabs/core/dist/addresses/1.json'
import { media as ZORA_MEDIA_ADDRESS_ROPSTEN } from '@zoralabs/core/dist/addresses/3.json'
import { media as ZORA_MEDIA_ADDRESS_RINKEBY } from '@zoralabs/core/dist/addresses/4.json'
import { media as ZORA_MEDIA_ADDRESS_MUMBAI } from '@zoralabs/core/dist/addresses/80001.json'
import { media as ZORA_MEDIA_ADDRESS_POLYGON } from '@zoralabs/core/dist/addresses/137.json'

import * as networks from './networks'

export const SUPERRARE_TOKEN_ADDRESS = {
  [networks.MAINNET]: '0xb932a70A57673d89f4acfFBE830E8ed7f75Fb9e0',
}

export const HASHMASKS_TOKEN_ADDRESS = {
  [networks.MAINNET]: '0xC2C747E0F7004F9E8817Db2ca4997657a7746928',
}

export const DECENTRALAND_TOKEN_ADDRESS = {
  [networks.MAINNET]: '0xF87E31492Faf9A91B02Ee0dEAAd50d51d56D5d4d',
}

export const ZORA_TOKEN_ADDRESS = {
  [networks.MAINNET]: ZORA_MEDIA_ADDRESS_MAINNET,
  [networks.ROPSTEN]: ZORA_MEDIA_ADDRESS_ROPSTEN,
  [networks.RINKEBY]: ZORA_MEDIA_ADDRESS_RINKEBY,
  [networks.POLYGON]: ZORA_MEDIA_ADDRESS_POLYGON,
  [networks.MUMBAI]: ZORA_MEDIA_ADDRESS_MUMBAI,
}

export const FOUNDATION_TOKEN_ADDRESS = {
  [networks.MAINNET]: '0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405',
}

export const MAKERSPLACE_TOKEN_ADDRESS = {
  [networks.MAINNET]: '0x2A46f2fFD99e19a89476E2f62270e0a35bBf0756',
}

export const ENS_TOKEN_ADDRESS = {
  [networks.MAINNET]: '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85',
  [networks.ROPSTEN]: '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85',
  [networks.RINKEBY]: '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85',
}

export const WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS = {
  [networks.MAINNET]: '0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6',
}

export const PUNKS_DATA_CONTRACT = {
  [networks.MAINNET]: '0x16F5A35647D6F03D5D3da7b35409D65ba03aF3B2',
}

export const BLITMAP_TOKEN_ADDRESS = {
  [networks.MAINNET]: '0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63',
}

export const HEAVEN_COMPUTER_TOKEN_ADDRESS = {
  [networks.MAINNET]: '0x80ADB36595239fe918c7D118C1F81e07d070801a',
}

export const POTION_ART_TOKEN_ADDRESS = {
  [networks.MAINNET]: '0xdA98f59e1EDeCb2545d7b07B794e704ed6cF1f7A',
}

export const LOOT_TOKEN_ADDRESS = {
  [networks.MAINNET]: '0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7',
}

export const AUTOGLYPHS_TOKEN_ADDRESS = {
  [networks.MAINNET]: '0xd4e4078ca3495DE5B1d4dB434BEbc5a986197782',
}
