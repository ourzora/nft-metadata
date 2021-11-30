import { getAddress } from '@ethersproject/address'

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
