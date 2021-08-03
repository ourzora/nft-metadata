import { getAddress } from '@ethersproject/address'

export function isAddressMatch(a: string, b: string) {
  return getAddress(a) === getAddress(b)
}
