import { getAddress } from '@ethersproject/address'

export function isAddressMatch(chainName: string, a: string, b: any) {
  return getAddress(a) === getAddress(b[chainName])
}
