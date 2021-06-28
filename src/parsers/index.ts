import { getAddress } from '@ethersproject/address'
import { parseGenericMetadata } from './openseaMetadataParser'
import {
  ART_BLOCKS_CURATED_TOKEN_ADDRESS,
  ART_BLOCKS_TOKEN_ADDRESS,
  HASHMASKS_TOKEN_ADDRESS,
  MAKERSPLACE_TOKEN_ADDRESS,
  ZORA_TOKEN_ADDRESS,
} from '../constants'
import { parseZoraMetadata } from './zoraMetadataParser'
import { parseMakersplaceMetadata } from './makersplaceMetadataParser'
import { parseHashmasksMetadata } from './hashmasksMetadataParser'
import { parseArtblocksMetadata } from './artblocksMetadataParser'

export function parserLookup(contractAddress: string) {
  const safeAddress = getAddress(contractAddress)
  switch (safeAddress) {
    case ART_BLOCKS_TOKEN_ADDRESS:
      return parseArtblocksMetadata
    case ART_BLOCKS_CURATED_TOKEN_ADDRESS:
      return parseArtblocksMetadata
    case HASHMASKS_TOKEN_ADDRESS:
      return parseHashmasksMetadata
    case MAKERSPLACE_TOKEN_ADDRESS:
      return parseMakersplaceMetadata
    case ZORA_TOKEN_ADDRESS:
      return parseZoraMetadata
    default:
      return parseGenericMetadata
  }
}
