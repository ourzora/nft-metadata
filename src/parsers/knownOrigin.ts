import { ParserConfig } from './index'

export async function parseKnownOriginMetadata(config: ParserConfig) {
  const { baseMeta } = config
  const baseAttributes: Record<string, any> = baseMeta.attributes || {}
  const attributes = Object.keys(baseAttributes).map((trait_type) => ({
    trait_type,
    value: baseAttributes[trait_type],
  }))

  return {
    attributes,
  }
}
