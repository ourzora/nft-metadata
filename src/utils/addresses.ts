import { getAddress } from '@ethersproject/address'
import { utils } from 'ethers'

export function isAddressMatch(chainName: string, a: string, b: any) {
  return getAddress(a) === getAddress(b[chainName])
}

export function normalizeTokenID1155(tokenId: string) {
  return utils
    .hexlify(utils.zeroPad(utils.arrayify(`0x${tokenId}`), 64))
    .substr(2)
}
