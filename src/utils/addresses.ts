import { getAddress } from '@ethersproject/address'
import { utils } from 'ethers'

export function isAddressMatch(
  chainName: string,
  address: string,
  addressByNetwork: { [address: string]: string },
) {
  if (!addressByNetwork[chainName]) {
    return false
  }
  return getAddress(address) === getAddress(addressByNetwork[chainName])
}

export function normalizeTokenID1155(tokenId: string) {
  return utils.hexZeroPad(utils.arrayify(tokenId), 32).replace('0x', '')
}
