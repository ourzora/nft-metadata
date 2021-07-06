import { parseGenericMetadata } from './openseaMetadataParser'
import { ParserConfig } from './index'

export async function parseArtblocksMetadata(config: ParserConfig) {
  const baseMeta = await parseGenericMetadata(config)
  return {
    ...baseMeta,
    ...(baseMeta.metadata.traits && { attributes: baseMeta.metadata.traits }),
  }
}
