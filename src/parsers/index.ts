import { getAddress } from '@ethersproject/address'
import { parseGenericMetadata } from './openseaMetadataParser'

export function parserLookup(contractAddress: string) {
  const safeAddress = getAddress(contractAddress)
  switch (safeAddress) {
    default:
      return parseGenericMetadata
  }
}
