import { getAddress } from '@ethersproject/address'
import {
  BLITMAP_TOKEN_ADDRESS,
  HASHMASKS_TOKEN_ADDRESS,
  KNOWN_ORIGIN_TOKEN_ADDRESS,
  MAKERSPLACE_TOKEN_ADDRESS,
  ZORA_TOKEN_ADDRESS,
} from '../constants'
import { zoraMetadataParser } from './zoraMetadataParser'
import { parseMakersplaceMetadata } from './makersplaceMetadataParser'
import { parseHashmasksMetadata } from './hashmasksMetadataParser'
import { JsonRpcProvider } from '@ethersproject/providers'
import { NftMetadata, TokenContractData, TokenData } from '../agent'
import { blitmapMetadataParser } from './blitmapMetadataParser'
import { parseKnownOriginMetadata } from './knownOrigin'

export type ParserResponse = Partial<NftMetadata>

export interface ParserConfig {
  fetchTimeout?: number
  ipfsGateway?: string
  provider: JsonRpcProvider
  contractData: TokenContractData
  tokenData: TokenData
  baseMeta: Partial<NftMetadata>
}

export type Parser = (config: ParserConfig) => Promise<ParserResponse>

export function parserLookup(
  contractAddress: string,
  parsers?: { [key: string]: Parser },
): Parser | undefined {
  const safeAddress = getAddress(contractAddress)

  if (parsers?.[safeAddress]) {
    return parsers[safeAddress]
  }

  switch (safeAddress) {
    case HASHMASKS_TOKEN_ADDRESS:
      return parseHashmasksMetadata
    case MAKERSPLACE_TOKEN_ADDRESS:
      return parseMakersplaceMetadata
    case ZORA_TOKEN_ADDRESS:
      return zoraMetadataParser
    case BLITMAP_TOKEN_ADDRESS:
      return blitmapMetadataParser
    case KNOWN_ORIGIN_TOKEN_ADDRESS:
      return parseKnownOriginMetadata
    default:
      return
  }
}
