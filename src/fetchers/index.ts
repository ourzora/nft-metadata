import { fetchUnderlyingContractData } from './defaultFetcher'
import { getAddress } from '@ethersproject/address'

export function fetcherLookup(contractAddress: string) {
  const safeAddress = getAddress(contractAddress)
  switch (safeAddress) {
    default:
      return fetchUnderlyingContractData
  }
}
