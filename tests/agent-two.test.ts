import {
  ALGOLITE_TOKEN_ADDRESS,
  ART_BLOCKS_CURATED_TOKEN_ADDRESS,
  ART_BLOCKS_TOKEN_ADDRESS,
  BLITMAP_TOKEN_ADDRESS,
  BLITNAUT_TOKEN_ADDRESS,
  BLOCKPARY_TOKEN_ADDRESS,
  BORED_APE_TOKEN_ADDRESS,
  CRYPTOVOXELS_TOKEN_ADDRESS,
  FOUNDATION_TOKEN_ADDRESS,
  HOLLY_PLUS_TOKEN_ADDRESS,
  KNOWN_ORIGIN_TOKEN_ADDRESS,
  LOOT_TOKEN_ADDRESS,
  MAKERSPLACE_TOKEN_ADDRESS,
  MANNYS_GAME_TOKEN_ADDRESS,
  MEEBITS_TOKEN_ADDRESS,
  Agent,
  SETTLEMENTS_TOKEN_ADDRESS,
  SOLVENCY_TOKEN_ADDRESS,
  SUPERRARE_TOKEN_ADDRESS,
  WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS,
  ZORA_TOKEN_ADDRESS,
} from '../src'
import { config as dotenv } from 'dotenv'

dotenv({ path: '.env.test' })

const RPC_URL = process.env.RPC_URL || 'https://cloudflare-eth.com/'
const IPFS_URL = process.env.IPFS_GATEWAY_URL

describe('Metadata Agent', () => {
  const parser = new Agent({
    network: 'homestead',
    networkUrl: RPC_URL,
    ipfsGatewayUrl: IPFS_URL,
  })

  beforeEach(() => {
    jest.setTimeout(60 * 1000)
  })

  it(`should be able to fetch and parse metadata for PUNKS: ${WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(
      WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS,
      '1',
    )
    console.log({ resp })
  })

  it(`should be able to fetch and parse metadata for BAYC: ${BORED_APE_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(BORED_APE_TOKEN_ADDRESS, '1')
    console.log({ resp })
  })

  it(`should be able to fetch and parse metadata for BLITMAP: ${BLITMAP_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(BLITMAP_TOKEN_ADDRESS, '1')
    console.log({ resp })
  })

  it(`should be able to fetch and parse metadata for MEEBIT: ${MEEBITS_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(MEEBITS_TOKEN_ADDRESS, '1')
    console.log({ resp })
  })

  it(`should be able to fetch and parse metadata for ZORA: ${ZORA_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(ZORA_TOKEN_ADDRESS, '4000')
    console.log({ resp })
  })

  it(`should be able to fetch and parse metadata for Holly Plu: ${HOLLY_PLUS_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(HOLLY_PLUS_TOKEN_ADDRESS, '1')
    console.log({ resp })
  })

  it(`should be able to fetch and parse metadata for Cryptovoxels Parcel ${CRYPTOVOXELS_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(CRYPTOVOXELS_TOKEN_ADDRESS, '1')
    console.log({ resp })
  })

  it(`should be able to fetch and parse metadata for Loot ${LOOT_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(LOOT_TOKEN_ADDRESS, '1')
    console.log(JSON.stringify(resp, null, 2))
  })

  it(`should be able to fetch and parse metadata for Settlements ${SETTLEMENTS_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(SETTLEMENTS_TOKEN_ADDRESS, '1')
    console.log({ resp })
  })

  it(`should be able to fetch and parse metadata for Blitnauts ${BLITNAUT_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(BLITNAUT_TOKEN_ADDRESS, '1')
    console.log({ resp })
  })

  it(`should be able to fetch and parse metadata for Known Origin ${KNOWN_ORIGIN_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(
      KNOWN_ORIGIN_TOKEN_ADDRESS,
      '219184',
    )
    console.log(JSON.stringify(resp, null, 2))
  })

  it(`should be able to fetch and parse metadata for Art Blocks Curated ${ART_BLOCKS_CURATED_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(
      ART_BLOCKS_CURATED_TOKEN_ADDRESS,
      '100',
    )
    console.log(JSON.stringify(resp, null, 2))
  })

  it(`should be able to fetch and parse metadata for Art Blocks Default ${ART_BLOCKS_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(
      ART_BLOCKS_TOKEN_ADDRESS,
      '167000537',
    )
    console.log(JSON.stringify(resp, null, 2))
  })

  it(`should be able to fetch and parse metadata for Makersplace ${MAKERSPLACE_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(MAKERSPLACE_TOKEN_ADDRESS, '63253')
    console.log(JSON.stringify(resp, null, 2))
  })

  it(`should be able to fetch and parse metadata for Foundation ${FOUNDATION_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(FOUNDATION_TOKEN_ADDRESS, '63253')
    console.log(JSON.stringify(resp, null, 2))
  })

  it(`should be able to fetch and parse metadata for Solvency ${SOLVENCY_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(SOLVENCY_TOKEN_ADDRESS, '420')
    console.log(JSON.stringify(resp, null, 2))
  })

  it(`should be able to fetch and parse metadata for SuperRate ${SUPERRARE_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(SUPERRARE_TOKEN_ADDRESS, '29061')
    console.log(JSON.stringify(resp, null, 2))
  })

  it(`should be able to fetch and parse metadata for BlockParty ${BLOCKPARY_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(BLOCKPARY_TOKEN_ADDRESS, '1290')
    console.log(JSON.stringify(resp, null, 2))
  })

  it(`should be able to fetch and parse metadata for Mannys Game ${MANNYS_GAME_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(MANNYS_GAME_TOKEN_ADDRESS, '1290')
    console.log(JSON.stringify(resp, null, 2))
  })

  it(`should be able to fetch and parse metadata for Algolite ${ALGOLITE_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(ALGOLITE_TOKEN_ADDRESS, '856')
    console.log(JSON.stringify(resp, null, 2))
  })
})
