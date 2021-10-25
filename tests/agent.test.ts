import {
  ALGOLITE_TOKEN_ADDRESS,
  ART_BLOCKS_CURATED_TOKEN_ADDRESS,
  ART_BLOCKS_TOKEN_ADDRESS,
  HEAVEN_COMPUTER_TOKEN_ADDRESS,
  BLITNAUT_TOKEN_ADDRESS,
  BLITMAP_TOKEN_ADDRESS,
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
  HUMANOID_TOKEN_ADDRESS,
  CYBERKORGZ_VX_TOKEN_ADDRESS,
  POTION_ART_TOKEN_ADDRESS,
  AUTOGLYPHS_TOKEN_ADDRESS,
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
    timeout: 60 * 10000,
  })

  beforeEach(() => {
    jest.setTimeout(60 * 1000)
  })

  it(`should handle a potion io art token address ${POTION_ART_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(POTION_ART_TOKEN_ADDRESS, '2')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "contentURL": "https://gateway.ipfs.io/ipfs/QmZM62hFkFDW255RhbaFs7u1xLiAJ25KFi8rUuaKxgNxbd",
        "contentURLMimeType": "image/jpeg",
        "description": "Acrylic on canvas, 90x90 cm.
      A street of my childhood painting in curry mood...
      ",
        "imageURL": "https://gateway.ipfs.io/ipfs/QmZM62hFkFDW255RhbaFs7u1xLiAJ25KFi8rUuaKxgNxbd",
        "imageURLMimeType": "image/jpeg",
        "metadata": Object {
          "properties": Object {
            "description": Object {
              "description": "Acrylic on canvas, 90x90 cm.
      A street of my childhood painting in curry mood...
      ",
              "type": "string",
            },
            "image": Object {
              "description": "https://ipfs.io/ipfs/QmZM62hFkFDW255RhbaFs7u1xLiAJ25KFi8rUuaKxgNxbd",
              "type": "string",
            },
            "name": Object {
              "description": "Curry Street",
              "type": "string",
            },
          },
          "title": "Asset Metadata",
          "type": "object",
        },
        "name": "Curry Street",
        "tokenAddress": "0xdA98f59e1EDeCb2545d7b07B794e704ed6cF1f7A",
        "tokenId": "2",
        "tokenURI": "https://ipfs.io/ipfs/Qmc2GNnurMgRZN6156vXutcgjYvdFyHGmAfsYE7bD1aVfp",
        "tokenURL": "https://gateway.ipfs.io/ipfs/Qmc2GNnurMgRZN6156vXutcgjYvdFyHGmAfsYE7bD1aVfp",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for PUNKS: ${WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(
      WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS,
      '1',
    )
    expect(resp).toMatchSnapshot()
  })

  it(`should be able to fetch and parse metadata for GLYPHS: ${AUTOGLYPHS_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(AUTOGLYPHS_TOKEN_ADDRESS, '1')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "Symbol Scheme",
            "value": "O|-",
          },
        ],
        "description": "Autoglyphs are the first “on-chain” generative art on the Ethereum blockchain. A completely self-contained mechanism for the creation and ownership of an artwork.",
        "externalURL": "https://www.larvalabs.com/autoglyphs/glyph?index=1",
        "metadata": Object {
          "description": "Autoglyphs are the first “on-chain” generative art on the Ethereum blockchain. A completely self-contained mechanism for the creation and ownership of an artwork.",
          "external_url": "https://www.larvalabs.com/autoglyphs/glyph?index=1",
          "name": "Autoglyph #1",
          "title": "Autoglyph #1",
        },
        "name": "Autoglyph #1",
        "tokenAddress": "0xd4e4078ca3495DE5B1d4dB434BEbc5a986197782",
        "tokenId": "1",
        "tokenURI": "data:text/plain;charset=utf-8,.|.|.O..-.-.-.-.-.|.|.|.O.O.O.O..O.O.O.O.|.|.|.-.-.-.-.-..O.|.|.%0A|-.|.O|.O-.|..|.O-.O..|..-.O-.|..|.-O.-..|..O.-O.|..|.-O.|O.|.-|%0A..|-..|-.OO-..|...|..O-..O|..O-..-O..|O..-O..|...|..-OO.-|..-|..%0A||-...OO|....OO--...O|--...||-....-||...--|O...--OO....|OO...-||%0A..........O.OOOOO||-||--.-............-.--||-||OOOOO.O..........%0AOO.......-|||OO.......-|-|OOO......OOO|-|-.......OO|||-.......OO%0A.||O..--O..-||O..-|O..-||...-|O..O|-...||-..O|-..O||-..O--..O||.%0A..-O..-O.-O..|..|..-O.--O.-O..|..|..O-.O--.O-..|..|..O-.O-..O-..%0A-O.|..O.-.-..|.-O.|.-O.|.|..O.-..-.O..|.|.O-.|.O-.|..-.-.O..|.O-%0A.-O..-.-.|.|.-.|.|.O.O.|.O.O..-..-..O.O.|.O.O.|.|.-.|.|.-.-..O-.%0A-.O.O|.O-.|..-.O-.O.O|.O-.|-.-.OO.-.-|.-O.|O.O.-O.-..|.-O.|O.O.-%0A.|-..|-..|..|-..|-.O|..O|..O-..OO..-O..|O..|O.-|..-|..|..-|..-|.%0A-...O||....||.....||....O|-...OOOO...-|O....||.....||....||O...-%0A...OOO|||---.---.........OOOO||||||OOOO.........---.---|||OOO...%0A-||OOOO......--|-|OO.O.......-||||-.......O.OO|-|--......OOOO||-%0A...-O...-|O..-||O...|O...-|O..-||-..O|-...O|...O||-..O|-...O-...%0A-O.-O..|O.-|..-O.-O..|..-O..|O.--.O|..O-..|..O-.O-..|-.O|..O-.O-%0A.-..|.-..|.-..|.-..|....|....|....|....|....|..-.|..-.|..-.|..-.%0A|.|.|.|.|.O.|.O.O.O.O.|.O.O.O-O..O-O.O.O.|.O.O.O.O.|.O.|.|.|.|.|%0A.O..-.O-.O.O|.O..|..-.|-.|..-.O..O.-..|.-|.-..|..O.|O.O.-O.-..O.%0A|..O|..O-.O|...|..O-..|-..|..O|..|O..|..-|..-O..|...|O.-O..|O..|%0A..O||...OO|...OO|....O|-...O||....||O...-|O....|OO...|OO...||O..%0A||------..........||||||---..........---||||||..........------||%0A...--||-||OO.......---||||OOO......OOO||||---.......OO||-||--...%0AO....-|O..-|O...-|O...-|...-|O....O|-...|-...O|-...O|-..O|-....O%0A.-O.-|..|O..|O.-O..|..-|..|O.-O..O-.O|..|-..|..O-.O|..O|..|-.O-.%0AO.|..O.-..|.-O.|..O.|.-O.|.-O.|..|.O-.|.O-.|.O..|.O-.|..-.O..|.O%0A.O.|.O.O.O-O.O.O.....O.O-O-O........O-O-O.O.....O.O.O-O.O.O.|.O.%0AO-.|.O-.O..-.O..|.O-.|.O|.O..|.OO.|..O.|O.|.-O.|..O.-..O.-O.|.-O%0A..O-..|...-..|-.O|-.O|..O-..|..OO..|..-O..|O.-|O.-|..-...|..-O..%0AO|-...O|--..O||-..OO|....O|....OO....|O....|OO..-||O..--|O...-|O%0A..........OOO|||-...........OOOOOOOO...........-|||OOO..........%0A..........OOO|||-...........OOOOOOOO...........-|||OOO..........%0AO|-...O|--..O||-..OO|....O|....OO....|O....|OO..-||O..--|O...-|O%0A..O-..|...-..|-.O|-.O|..O-..|..OO..|..-O..|O.-|O.-|..-...|..-O..%0AO-.|.O-.O..-.O..|.O-.|.O|.O..|.OO.|..O.|O.|.-O.|..O.-..O.-O.|.-O%0A.O.|.O.O.O-O.O.O.....O.O-O-O........O-O-O.O.....O.O.O-O.O.O.|.O.%0AO.|..O.-..|.-O.|..O.|.-O.|.-O.|..|.O-.|.O-.|.O..|.O-.|..-.O..|.O%0A.-O.-|..|O..|O.-O..|..-|..|O.-O..O-.O|..|-..|..O-.O|..O|..|-.O-.%0AO....-|O..-|O...-|O...-|...-|O....O|-...|-...O|-...O|-..O|-....O%0A...--||-||OO.......---||||OOO......OOO||||---.......OO||-||--...%0A||------..........||||||---..........---||||||..........------||%0A..O||...OO|...OO|....O|-...O||....||O...-|O....|OO...|OO...||O..%0A|..O|..O-.O|...|..O-..|-..|..O|..|O..|..-|..-O..|...|O.-O..|O..|%0A.O..-.O-.O.O|.O..|..-.|-.|..-.O..O.-..|.-|.-..|..O.|O.O.-O.-..O.%0A|.|.|.|.|.O.|.O.O.O.O.|.O.O.O-O..O-O.O.O.|.O.O.O.O.|.O.|.|.|.|.|%0A.-..|.-..|.-..|.-..|....|....|....|....|....|..-.|..-.|..-.|..-.%0A-O.-O..|O.-|..-O.-O..|..-O..|O.--.O|..O-..|..O-.O-..|-.O|..O-.O-%0A...-O...-|O..-||O...|O...-|O..-||-..O|-...O|...O||-..O|-...O-...%0A-||OOOO......--|-|OO.O.......-||||-.......O.OO|-|--......OOOO||-%0A...OOO|||---.---.........OOOO||||||OOOO.........---.---|||OOO...%0A-...O||....||.....||....O|-...OOOO...-|O....||.....||....||O...-%0A.|-..|-..|..|-..|-.O|..O|..O-..OO..-O..|O..|O.-|..-|..|..-|..-|.%0A-.O.O|.O-.|..-.O-.O.O|.O-.|-.-.OO.-.-|.-O.|O.O.-O.-..|.-O.|O.O.-%0A.-O..-.-.|.|.-.|.|.O.O.|.O.O..-..-..O.O.|.O.O.|.|.-.|.|.-.-..O-.%0A-O.|..O.-.-..|.-O.|.-O.|.|..O.-..-.O..|.|.O-.|.O-.|..-.-.O..|.O-%0A..-O..-O.-O..|..|..-O.--O.-O..|..|..O-.O--.O-..|..|..O-.O-..O-..%0A.||O..--O..-||O..-|O..-||...-|O..O|-...||-..O|-..O||-..O--..O||.%0AOO.......-|||OO.......-|-|OOO......OOO|-|-.......OO|||-.......OO%0A..........O.OOOOO||-||--.-............-.--||-||OOOOO.O..........%0A||-...OO|....OO--...O|--...||-....-||...--|O...--OO....|OO...-||%0A..|-..|-.OO-..|...|..O-..O|..O-..-O..|O..-O..|...|..-OO.-|..-|..%0A|-.|.O|.O-.|..|.O-.O..|..-.O-.|..|.-O.-..|..O.-O.|..|.-O.|O.|.-|%0A.|.|.O..-.-.-.-.-.|.|.|.O.O.O.O..O.O.O.O.|.|.|.-.-.-.-.-..O.|.|.%0A",
        "tokenURL": "data:text/plain;charset=utf-8,.|.|.O..-.-.-.-.-.|.|.|.O.O.O.O..O.O.O.O.|.|.|.-.-.-.-.-..O.|.|.%0A|-.|.O|.O-.|..|.O-.O..|..-.O-.|..|.-O.-..|..O.-O.|..|.-O.|O.|.-|%0A..|-..|-.OO-..|...|..O-..O|..O-..-O..|O..-O..|...|..-OO.-|..-|..%0A||-...OO|....OO--...O|--...||-....-||...--|O...--OO....|OO...-||%0A..........O.OOOOO||-||--.-............-.--||-||OOOOO.O..........%0AOO.......-|||OO.......-|-|OOO......OOO|-|-.......OO|||-.......OO%0A.||O..--O..-||O..-|O..-||...-|O..O|-...||-..O|-..O||-..O--..O||.%0A..-O..-O.-O..|..|..-O.--O.-O..|..|..O-.O--.O-..|..|..O-.O-..O-..%0A-O.|..O.-.-..|.-O.|.-O.|.|..O.-..-.O..|.|.O-.|.O-.|..-.-.O..|.O-%0A.-O..-.-.|.|.-.|.|.O.O.|.O.O..-..-..O.O.|.O.O.|.|.-.|.|.-.-..O-.%0A-.O.O|.O-.|..-.O-.O.O|.O-.|-.-.OO.-.-|.-O.|O.O.-O.-..|.-O.|O.O.-%0A.|-..|-..|..|-..|-.O|..O|..O-..OO..-O..|O..|O.-|..-|..|..-|..-|.%0A-...O||....||.....||....O|-...OOOO...-|O....||.....||....||O...-%0A...OOO|||---.---.........OOOO||||||OOOO.........---.---|||OOO...%0A-||OOOO......--|-|OO.O.......-||||-.......O.OO|-|--......OOOO||-%0A...-O...-|O..-||O...|O...-|O..-||-..O|-...O|...O||-..O|-...O-...%0A-O.-O..|O.-|..-O.-O..|..-O..|O.--.O|..O-..|..O-.O-..|-.O|..O-.O-%0A.-..|.-..|.-..|.-..|....|....|....|....|....|..-.|..-.|..-.|..-.%0A|.|.|.|.|.O.|.O.O.O.O.|.O.O.O-O..O-O.O.O.|.O.O.O.O.|.O.|.|.|.|.|%0A.O..-.O-.O.O|.O..|..-.|-.|..-.O..O.-..|.-|.-..|..O.|O.O.-O.-..O.%0A|..O|..O-.O|...|..O-..|-..|..O|..|O..|..-|..-O..|...|O.-O..|O..|%0A..O||...OO|...OO|....O|-...O||....||O...-|O....|OO...|OO...||O..%0A||------..........||||||---..........---||||||..........------||%0A...--||-||OO.......---||||OOO......OOO||||---.......OO||-||--...%0AO....-|O..-|O...-|O...-|...-|O....O|-...|-...O|-...O|-..O|-....O%0A.-O.-|..|O..|O.-O..|..-|..|O.-O..O-.O|..|-..|..O-.O|..O|..|-.O-.%0AO.|..O.-..|.-O.|..O.|.-O.|.-O.|..|.O-.|.O-.|.O..|.O-.|..-.O..|.O%0A.O.|.O.O.O-O.O.O.....O.O-O-O........O-O-O.O.....O.O.O-O.O.O.|.O.%0AO-.|.O-.O..-.O..|.O-.|.O|.O..|.OO.|..O.|O.|.-O.|..O.-..O.-O.|.-O%0A..O-..|...-..|-.O|-.O|..O-..|..OO..|..-O..|O.-|O.-|..-...|..-O..%0AO|-...O|--..O||-..OO|....O|....OO....|O....|OO..-||O..--|O...-|O%0A..........OOO|||-...........OOOOOOOO...........-|||OOO..........%0A..........OOO|||-...........OOOOOOOO...........-|||OOO..........%0AO|-...O|--..O||-..OO|....O|....OO....|O....|OO..-||O..--|O...-|O%0A..O-..|...-..|-.O|-.O|..O-..|..OO..|..-O..|O.-|O.-|..-...|..-O..%0AO-.|.O-.O..-.O..|.O-.|.O|.O..|.OO.|..O.|O.|.-O.|..O.-..O.-O.|.-O%0A.O.|.O.O.O-O.O.O.....O.O-O-O........O-O-O.O.....O.O.O-O.O.O.|.O.%0AO.|..O.-..|.-O.|..O.|.-O.|.-O.|..|.O-.|.O-.|.O..|.O-.|..-.O..|.O%0A.-O.-|..|O..|O.-O..|..-|..|O.-O..O-.O|..|-..|..O-.O|..O|..|-.O-.%0AO....-|O..-|O...-|O...-|...-|O....O|-...|-...O|-...O|-..O|-....O%0A...--||-||OO.......---||||OOO......OOO||||---.......OO||-||--...%0A||------..........||||||---..........---||||||..........------||%0A..O||...OO|...OO|....O|-...O||....||O...-|O....|OO...|OO...||O..%0A|..O|..O-.O|...|..O-..|-..|..O|..|O..|..-|..-O..|...|O.-O..|O..|%0A.O..-.O-.O.O|.O..|..-.|-.|..-.O..O.-..|.-|.-..|..O.|O.O.-O.-..O.%0A|.|.|.|.|.O.|.O.O.O.O.|.O.O.O-O..O-O.O.O.|.O.O.O.O.|.O.|.|.|.|.|%0A.-..|.-..|.-..|.-..|....|....|....|....|....|..-.|..-.|..-.|..-.%0A-O.-O..|O.-|..-O.-O..|..-O..|O.--.O|..O-..|..O-.O-..|-.O|..O-.O-%0A...-O...-|O..-||O...|O...-|O..-||-..O|-...O|...O||-..O|-...O-...%0A-||OOOO......--|-|OO.O.......-||||-.......O.OO|-|--......OOOO||-%0A...OOO|||---.---.........OOOO||||||OOOO.........---.---|||OOO...%0A-...O||....||.....||....O|-...OOOO...-|O....||.....||....||O...-%0A.|-..|-..|..|-..|-.O|..O|..O-..OO..-O..|O..|O.-|..-|..|..-|..-|.%0A-.O.O|.O-.|..-.O-.O.O|.O-.|-.-.OO.-.-|.-O.|O.O.-O.-..|.-O.|O.O.-%0A.-O..-.-.|.|.-.|.|.O.O.|.O.O..-..-..O.O.|.O.O.|.|.-.|.|.-.-..O-.%0A-O.|..O.-.-..|.-O.|.-O.|.|..O.-..-.O..|.|.O-.|.O-.|..-.-.O..|.O-%0A..-O..-O.-O..|..|..-O.--O.-O..|..|..O-.O--.O-..|..|..O-.O-..O-..%0A.||O..--O..-||O..-|O..-||...-|O..O|-...||-..O|-..O||-..O--..O||.%0AOO.......-|||OO.......-|-|OOO......OOO|-|-.......OO|||-.......OO%0A..........O.OOOOO||-||--.-............-.--||-||OOOOO.O..........%0A||-...OO|....OO--...O|--...||-....-||...--|O...--OO....|OO...-||%0A..|-..|-.OO-..|...|..O-..O|..O-..-O..|O..-O..|...|..-OO.-|..-|..%0A|-.|.O|.O-.|..|.O-.O..|..-.O-.|..|.-O.-..|..O.-O.|..|.-O.|O.|.-|%0A.|.|.O..-.-.-.-.-.|.|.|.O.O.O.O..O.O.O.O.|.|.|.-.-.-.-.-..O.|.|.%0A",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for PUNKS: ${WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(
      WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS,
      '2066',
    )
    expect(resp).toMatchSnapshot()
  })

  it(`should be able to fetch and parse metadata for BAYC: ${BORED_APE_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(BORED_APE_TOKEN_ADDRESS, '1')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "Mouth",
            "value": "Grin",
          },
          Object {
            "trait_type": "Clothes",
            "value": "Vietnam Jacket",
          },
          Object {
            "trait_type": "Background",
            "value": "Orange",
          },
          Object {
            "trait_type": "Eyes",
            "value": "Blue Beams",
          },
          Object {
            "trait_type": "Fur",
            "value": "Robot",
          },
        ],
        "contentURL": "https://gateway.ipfs.io/ipfs/QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi",
        "contentURLMimeType": "image/png",
        "imageURL": "https://gateway.ipfs.io/ipfs/QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi",
        "imageURLMimeType": "image/png",
        "metadata": Object {
          "attributes": Array [
            Object {
              "trait_type": "Mouth",
              "value": "Grin",
            },
            Object {
              "trait_type": "Clothes",
              "value": "Vietnam Jacket",
            },
            Object {
              "trait_type": "Background",
              "value": "Orange",
            },
            Object {
              "trait_type": "Eyes",
              "value": "Blue Beams",
            },
            Object {
              "trait_type": "Fur",
              "value": "Robot",
            },
          ],
          "image": "ipfs://QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi",
        },
        "tokenAddress": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
        "tokenId": "1",
        "tokenURI": "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1",
        "tokenURL": "https://gateway.ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for HEAVE_COMPUTER: ${HEAVEN_COMPUTER_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(HEAVEN_COMPUTER_TOKEN_ADDRESS, '1')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "display_type": "date",
            "trait_type": "ghost download date",
            "value": 1629396703,
          },
          Object {
            "trait_type": "ghost energy emotion",
            "value": "Cheering",
          },
          Object {
            "trait_type": "ghost energy gender",
            "value": "Male",
          },
          Object {
            "trait_type": "ghost skin surface",
            "value": "Smooth",
          },
          Object {
            "trait_type": "ghost skin shade",
            "value": "Minty Green",
          },
          Object {
            "trait_type": "temple chiaroscuro",
            "value": "Light",
          },
          Object {
            "trait_type": "temple ambiance shade",
            "value": "Tiffany Rose",
          },
          Object {
            "trait_type": "temple water shade",
            "value": "Opal Turquoise",
          },
          Object {
            "display_type": "boost_percentage",
            "trait_type": "ghost distortion",
            "value": 86,
          },
          Object {
            "display_type": "boost_percentage",
            "trait_type": "temple mist",
            "value": 47,
          },
          Object {
            "trait_type": "ghost skeleton corruption",
            "value": "Right Forearm",
          },
        ],
        "contentURL": "https://gateway.ipfs.io/ipfs/Qmda92saoBewnX35Nh78nfjymE5Ggg85P2Q3htZ2VUjrxJ",
        "contentURLMimeType": "video/mp4",
        "description": "A ghost is seen roaming around the temple. Although the gender of ghosts is generally ambiguous, this ghost radiates a masculine energy. He appears to be applauding or cheering for someone, as his smooth skin casts a minty green color. Upon his presence, the temple's ambiance has turned into a shade reminiscent of that of a Tiffany Rose, and the sacred waters below have shifted into an opal turquoise hue. The atmosphere feels bright and light, which could symbolize the hush that exists around you and your ghost. The ghost's data displays high levels of corruption, potentially caused by sparks of excitement or unchanneled creative energy when running the encoding of his conscience tape. It appears the ghost has a limb or bone that may require your attention: his right forearm. This could be where your strength comes from. Cheering for yourself is nice, cheering for others is twice as nice.",
        "externalURL": "https://ghost.software/token/1",
        "imageURL": "https://gateway.ipfs.io/ipfs/Qmda92saoBewnX35Nh78nfjymE5Ggg85P2Q3htZ2VUjrxJ",
        "imageURLMimeType": "video/mp4",
        "metadata": Object {
          "animation_url": "https://api.heaven.computer/ghost/1",
          "attributes": Array [
            Object {
              "display_type": "date",
              "trait_type": "ghost download date",
              "value": 1629396703,
            },
            Object {
              "trait_type": "ghost energy emotion",
              "value": "Cheering",
            },
            Object {
              "trait_type": "ghost energy gender",
              "value": "Male",
            },
            Object {
              "trait_type": "ghost skin surface",
              "value": "Smooth",
            },
            Object {
              "trait_type": "ghost skin shade",
              "value": "Minty Green",
            },
            Object {
              "trait_type": "temple chiaroscuro",
              "value": "Light",
            },
            Object {
              "trait_type": "temple ambiance shade",
              "value": "Tiffany Rose",
            },
            Object {
              "trait_type": "temple water shade",
              "value": "Opal Turquoise",
            },
            Object {
              "display_type": "boost_percentage",
              "trait_type": "ghost distortion",
              "value": 86,
            },
            Object {
              "display_type": "boost_percentage",
              "trait_type": "temple mist",
              "value": 47,
            },
            Object {
              "trait_type": "ghost skeleton corruption",
              "value": "Right Forearm",
            },
          ],
          "collection_name": "GhostSoftware",
          "description": "A ghost is seen roaming around the temple. Although the gender of ghosts is generally ambiguous, this ghost radiates a masculine energy. He appears to be applauding or cheering for someone, as his smooth skin casts a minty green color. Upon his presence, the temple's ambiance has turned into a shade reminiscent of that of a Tiffany Rose, and the sacred waters below have shifted into an opal turquoise hue. The atmosphere feels bright and light, which could symbolize the hush that exists around you and your ghost. The ghost's data displays high levels of corruption, potentially caused by sparks of excitement or unchanneled creative energy when running the encoding of his conscience tape. It appears the ghost has a limb or bone that may require your attention: his right forearm. This could be where your strength comes from. Cheering for yourself is nice, cheering for others is twice as nice.",
          "external_url": "https://ghost.software/token/1",
          "image": "ipfs://Qmda92saoBewnX35Nh78nfjymE5Ggg85P2Q3htZ2VUjrxJ",
          "interactive_nft": Object {
            "code_uri": "https://api.heaven.computer/ghost/1",
            "version": "0.0.1",
          },
          "license": "NFT License",
          "name": "The Cheering Minty Green Man #1",
          "platform": "HeavenComputer",
          "tokenID": 1,
          "website": "https://heaven.computer",
        },
        "name": "The Cheering Minty Green Man #1",
        "tokenAddress": "0x80ADB36595239fe918c7D118C1F81e07d070801a",
        "tokenId": "1",
        "tokenURI": "https://api.heaven.computer/token/1",
        "tokenURL": "https://api.heaven.computer/token/1",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for MEEBIT: ${MEEBITS_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(MEEBITS_TOKEN_ADDRESS, '1')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "Type",
            "value": "Human",
          },
          Object {
            "trait_type": "Hair Style",
            "value": "Bald",
          },
          Object {
            "trait_type": "Hat",
            "value": "Backwards Cap",
          },
          Object {
            "trait_type": "Hat Color",
            "value": "Gray",
          },
          Object {
            "trait_type": "Shirt",
            "value": "Skull Tee",
          },
          Object {
            "trait_type": "Overshirt",
            "value": "Athletic Jacket",
          },
          Object {
            "trait_type": "Overshirt Color",
            "value": "Red",
          },
          Object {
            "trait_type": "Pants",
            "value": "Cargo Pants",
          },
          Object {
            "trait_type": "Pants Color",
            "value": "Camo",
          },
          Object {
            "trait_type": "Shoes",
            "value": "Workboots",
          },
        ],
        "contentURL": "http://meebits.larvalabs.com/meebitimages/characterimage?index=1&type=full&imageType=jpg",
        "contentURLMimeType": "image/jpg",
        "description": "Meebit #1",
        "imageURL": "http://meebits.larvalabs.com/meebitimages/characterimage?index=1&type=full&imageType=jpg",
        "imageURLMimeType": "image/jpg",
        "metadata": Object {
          "attributes": Array [
            Object {
              "trait_type": "Type",
              "value": "Human",
            },
            Object {
              "trait_type": "Hair Style",
              "value": "Bald",
            },
            Object {
              "trait_type": "Hat",
              "value": "Backwards Cap",
            },
            Object {
              "trait_type": "Hat Color",
              "value": "Gray",
            },
            Object {
              "trait_type": "Shirt",
              "value": "Skull Tee",
            },
            Object {
              "trait_type": "Overshirt",
              "value": "Athletic Jacket",
            },
            Object {
              "trait_type": "Overshirt Color",
              "value": "Red",
            },
            Object {
              "trait_type": "Pants",
              "value": "Cargo Pants",
            },
            Object {
              "trait_type": "Pants Color",
              "value": "Camo",
            },
            Object {
              "trait_type": "Shoes",
              "value": "Workboots",
            },
          ],
          "description": "Meebit #1",
          "image": "http://meebits.larvalabs.com/meebitimages/characterimage?index=1&type=full&imageType=jpg",
          "name": "Meebit #1",
        },
        "name": "Meebit #1",
        "tokenAddress": "0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7",
        "tokenId": "1",
        "tokenURI": "https://meebits.larvalabs.com/meebit/1",
        "tokenURL": "https://meebits.larvalabs.com/meebit/1",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for ZORA: ${ZORA_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(ZORA_TOKEN_ADDRESS, '4000')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "contentURL": "https://ipfs.fleek.co/ipfs/bafybeiggi26g2c7enmdt6oip5ni2ba73qgcziqbxnkdxpalym5smmawmo4",
        "contentURLMimeType": "video/mp4",
        "description": "An abstract depicting the main thrusters of a mothership.",
        "metadata": Object {
          "description": "An abstract depicting the main thrusters of a mothership.",
          "mimeType": "video/mp4",
          "name": "Ignition",
          "version": "zora-20210101",
        },
        "name": "Ignition",
        "tokenAddress": "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7",
        "tokenId": "4000",
        "tokenURI": "https://ipfs.fleek.co/ipfs/bafybeiflyzanwx6ensp3fa7piqbqysgjr3l4xmw7sqogwmghqoiaadtqqq",
        "tokenURL": "https://gateway.ipfs.io/ipfs/bafybeiflyzanwx6ensp3fa7piqbqysgjr3l4xmw7sqogwmghqoiaadtqqq",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for Holly Plu: ${HOLLY_PLUS_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(HOLLY_PLUS_TOKEN_ADDRESS, '1')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "contentURL": "https://gateway.ipfs.io/ipfs/bafybeihjm3f4bqyn5j4gsyhsp62lomuerjcyu4uah6oc2ha4pkki4c226u",
        "contentURLMimeType": "audio/wav",
        "description": "ヾ(´〇｀)ﾉ This is the first Holly+ speech model! ヾ(´〇｀)ﾉ 
      Profits generated from the sale of this NFT will be used by Holly+ DAO to improve the model and create tools for artists to experiment with it! 
      Included in the file are two models trained on the same data.",
        "externalURL": "https://auction.holly.plus/token/1",
        "imageURL": "https://gateway.ipfs.io/ipfs/bafybeicfql3wz5ulh4de6spanczunyolqa5uhahqqzdrd6vcnu5tqxnhly",
        "imageURLMimeType": "image/gif",
        "metadata": Object {
          "animation_url": "ipfs://bafybeihjm3f4bqyn5j4gsyhsp62lomuerjcyu4uah6oc2ha4pkki4c226u",
          "content": Object {
            "mime": "application/zip",
            "url": "ipfs://bafybeibgmomfgujsuvasi5v2he5qchavzrmjihq5yqpbz5iyqjrtezc6ua",
          },
          "description": "ヾ(´〇｀)ﾉ This is the first Holly+ speech model! ヾ(´〇｀)ﾉ 
      Profits generated from the sale of this NFT will be used by Holly+ DAO to improve the model and create tools for artists to experiment with it! 
      Included in the file are two models trained on the same data.",
          "external_url": "https://auction.holly.plus/token/1",
          "image": "ipfs://bafybeicfql3wz5ulh4de6spanczunyolqa5uhahqqzdrd6vcnu5tqxnhly",
          "name": "Genesis - Holly+ Speaking Model I",
        },
        "name": "Genesis - Holly+ Speaking Model I",
        "tokenAddress": "0x6688Ee4E6e17a9cF88A13Da833b011E64C2B4203",
        "tokenId": "1",
        "tokenURI": "ipfs://bafybeihbarwrmsai2grajb6az7n6aokbxrtl6dq4lqmcrbmq62poa3smla",
        "tokenURL": "https://gateway.ipfs.io/ipfs/bafybeihbarwrmsai2grajb6az7n6aokbxrtl6dq4lqmcrbmq62poa3smla",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for Cryptovoxels Parcel ${CRYPTOVOXELS_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(CRYPTOVOXELS_TOKEN_ADDRESS, '1')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "area",
            "value": 234.00000000000003,
          },
          Object {
            "trait_type": "width",
            "value": 13,
          },
          Object {
            "trait_type": "depth",
            "value": 18,
          },
          Object {
            "trait_type": "height",
            "value": 9,
          },
          Object {
            "trait_type": "elevation",
            "value": 0,
          },
          Object {
            "trait_type": "suburb",
            "value": "The Center",
          },
          Object {
            "trait_type": "island",
            "value": "Origin City",
          },
          Object {
            "trait_type": "title",
            "value": "plot",
          },
        ],
        "contentURL": "https://map.cryptovoxels.com/tile/parcel?x=0.09&y=0.11",
        "contentURLMimeType": "image/png",
        "description": "234m² parcel near The Center in Origin City, 2m from the origin, with a 9m build height and near to Addy Gardens, Block Fork, Ben Bypass, Buffer Crossing and Angstrom Arcade",
        "externalURL": "https://www.cryptovoxels.com/parcels/1",
        "imageURL": "https://map.cryptovoxels.com/tile/parcel?x=0.09&y=0.11",
        "imageURLMimeType": "image/png",
        "metadata": Object {
          "attributes": Object {
            "area": 234.00000000000003,
            "depth": 18,
            "elevation": 0,
            "height": 9,
            "island": "Origin City",
            "suburb": "The Center",
            "title": "plot",
            "width": 13,
          },
          "background_color": "f3f3f3",
          "description": "234m² parcel near The Center in Origin City, 2m from the origin, with a 9m build height and near to Addy Gardens, Block Fork, Ben Bypass, Buffer Crossing and Angstrom Arcade",
          "external_url": "https://www.cryptovoxels.com/parcels/1",
          "image": "https://map.cryptovoxels.com/tile/parcel?x=0.09&y=0.11",
          "name": "70 Block Fork",
        },
        "name": "70 Block Fork",
        "tokenAddress": "0x79986aF15539de2db9A5086382daEdA917A9CF0C",
        "tokenId": "1",
        "tokenURI": "https://www.cryptovoxels.com/p/1",
        "tokenURL": "https://www.cryptovoxels.com/p/1",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for Loot ${LOOT_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(LOOT_TOKEN_ADDRESS, '1')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "Chest",
            "value": "Hard Leather Armor",
          },
          Object {
            "trait_type": "Foot",
            "value": "\\"Death Root\\" Ornate Greaves of Skill",
          },
          Object {
            "trait_type": "Hand",
            "value": "Studded Leather Gloves",
          },
          Object {
            "trait_type": "Neck",
            "value": "Divine Hood",
          },
          Object {
            "trait_type": "Ring",
            "value": "Necklace of Enlightenment",
          },
          Object {
            "trait_type": "Waist",
            "value": "Gold Ring",
          },
          Object {
            "trait_type": "Weapon",
            "value": "Hard Leather Belt",
          },
        ],
        "contentURL": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIiAvPjx0ZXh0IHg9IjEwIiB5PSIyMCIgY2xhc3M9ImJhc2UiPiJHcmltIFNob3V0IiBHcmF2ZSBXYW5kIG9mIFNraWxsICsxPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSI0MCIgY2xhc3M9ImJhc2UiPkhhcmQgTGVhdGhlciBBcm1vcjwvdGV4dD48dGV4dCB4PSIxMCIgeT0iNjAiIGNsYXNzPSJiYXNlIj5EaXZpbmUgSG9vZDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iODAiIGNsYXNzPSJiYXNlIj5IYXJkIExlYXRoZXIgQmVsdDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iMTAwIiBjbGFzcz0iYmFzZSI+IkRlYXRoIFJvb3QiIE9ybmF0ZSBHcmVhdmVzIG9mIFNraWxsPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxMjAiIGNsYXNzPSJiYXNlIj5TdHVkZGVkIExlYXRoZXIgR2xvdmVzPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNDAiIGNsYXNzPSJiYXNlIj5OZWNrbGFjZSBvZiBFbmxpZ2h0ZW5tZW50PC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNjAiIGNsYXNzPSJiYXNlIj5Hb2xkIFJpbmc8L3RleHQ+PC9zdmc+",
        "contentURLMimeType": "image/svg+xml",
        "description": "Loot is randomized adventurer gear generated and stored on chain. Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use Loot in any way you want.",
        "imageURL": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIiAvPjx0ZXh0IHg9IjEwIiB5PSIyMCIgY2xhc3M9ImJhc2UiPiJHcmltIFNob3V0IiBHcmF2ZSBXYW5kIG9mIFNraWxsICsxPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSI0MCIgY2xhc3M9ImJhc2UiPkhhcmQgTGVhdGhlciBBcm1vcjwvdGV4dD48dGV4dCB4PSIxMCIgeT0iNjAiIGNsYXNzPSJiYXNlIj5EaXZpbmUgSG9vZDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iODAiIGNsYXNzPSJiYXNlIj5IYXJkIExlYXRoZXIgQmVsdDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iMTAwIiBjbGFzcz0iYmFzZSI+IkRlYXRoIFJvb3QiIE9ybmF0ZSBHcmVhdmVzIG9mIFNraWxsPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxMjAiIGNsYXNzPSJiYXNlIj5TdHVkZGVkIExlYXRoZXIgR2xvdmVzPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNDAiIGNsYXNzPSJiYXNlIj5OZWNrbGFjZSBvZiBFbmxpZ2h0ZW5tZW50PC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNjAiIGNsYXNzPSJiYXNlIj5Hb2xkIFJpbmc8L3RleHQ+PC9zdmc+",
        "imageURLMimeType": "image/svg+xml",
        "metadata": Object {
          "description": "Loot is randomized adventurer gear generated and stored on chain. Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use Loot in any way you want.",
          "image": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIiAvPjx0ZXh0IHg9IjEwIiB5PSIyMCIgY2xhc3M9ImJhc2UiPiJHcmltIFNob3V0IiBHcmF2ZSBXYW5kIG9mIFNraWxsICsxPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSI0MCIgY2xhc3M9ImJhc2UiPkhhcmQgTGVhdGhlciBBcm1vcjwvdGV4dD48dGV4dCB4PSIxMCIgeT0iNjAiIGNsYXNzPSJiYXNlIj5EaXZpbmUgSG9vZDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iODAiIGNsYXNzPSJiYXNlIj5IYXJkIExlYXRoZXIgQmVsdDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iMTAwIiBjbGFzcz0iYmFzZSI+IkRlYXRoIFJvb3QiIE9ybmF0ZSBHcmVhdmVzIG9mIFNraWxsPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxMjAiIGNsYXNzPSJiYXNlIj5TdHVkZGVkIExlYXRoZXIgR2xvdmVzPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNDAiIGNsYXNzPSJiYXNlIj5OZWNrbGFjZSBvZiBFbmxpZ2h0ZW5tZW50PC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNjAiIGNsYXNzPSJiYXNlIj5Hb2xkIFJpbmc8L3RleHQ+PC9zdmc+",
          "name": "Bag #1",
        },
        "name": "Bag #1",
        "tokenAddress": "0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7",
        "tokenId": "1",
        "tokenURI": "data:application/json;base64,eyJuYW1lIjogIkJhZyAjMSIsICJkZXNjcmlwdGlvbiI6ICJMb290IGlzIHJhbmRvbWl6ZWQgYWR2ZW50dXJlciBnZWFyIGdlbmVyYXRlZCBhbmQgc3RvcmVkIG9uIGNoYWluLiBTdGF0cywgaW1hZ2VzLCBhbmQgb3RoZXIgZnVuY3Rpb25hbGl0eSBhcmUgaW50ZW50aW9uYWxseSBvbWl0dGVkIGZvciBvdGhlcnMgdG8gaW50ZXJwcmV0LiBGZWVsIGZyZWUgdG8gdXNlIExvb3QgaW4gYW55IHdheSB5b3Ugd2FudC4iLCAiaW1hZ2UiOiAiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhCeVpYTmxjblpsUVhOd1pXTjBVbUYwYVc4OUluaE5hVzVaVFdsdUlHMWxaWFFpSUhacFpYZENiM2c5SWpBZ01DQXpOVEFnTXpVd0lqNDhjM1I1YkdVK0xtSmhjMlVnZXlCbWFXeHNPaUIzYUdsMFpUc2dabTl1ZEMxbVlXMXBiSGs2SUhObGNtbG1PeUJtYjI1MExYTnBlbVU2SURFMGNIZzdJSDA4TDNOMGVXeGxQanh5WldOMElIZHBaSFJvUFNJeE1EQWxJaUJvWldsbmFIUTlJakV3TUNVaUlHWnBiR3c5SW1Kc1lXTnJJaUF2UGp4MFpYaDBJSGc5SWpFd0lpQjVQU0l5TUNJZ1kyeGhjM005SW1KaGMyVWlQaUpIY21sdElGTm9iM1YwSWlCSGNtRjJaU0JYWVc1a0lHOW1JRk5yYVd4c0lDc3hQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJME1DSWdZMnhoYzNNOUltSmhjMlVpUGtoaGNtUWdUR1ZoZEdobGNpQkJjbTF2Y2p3dmRHVjRkRDQ4ZEdWNGRDQjRQU0l4TUNJZ2VUMGlOakFpSUdOc1lYTnpQU0ppWVhObElqNUVhWFpwYm1VZ1NHOXZaRHd2ZEdWNGRENDhkR1Y0ZENCNFBTSXhNQ0lnZVQwaU9EQWlJR05zWVhOelBTSmlZWE5sSWo1SVlYSmtJRXhsWVhSb1pYSWdRbVZzZER3dmRHVjRkRDQ4ZEdWNGRDQjRQU0l4TUNJZ2VUMGlNVEF3SWlCamJHRnpjejBpWW1GelpTSStJa1JsWVhSb0lGSnZiM1FpSUU5eWJtRjBaU0JIY21WaGRtVnpJRzltSUZOcmFXeHNQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJeE1qQWlJR05zWVhOelBTSmlZWE5sSWo1VGRIVmtaR1ZrSUV4bFlYUm9aWElnUjJ4dmRtVnpQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJeE5EQWlJR05zWVhOelBTSmlZWE5sSWo1T1pXTnJiR0ZqWlNCdlppQkZibXhwWjJoMFpXNXRaVzUwUEM5MFpYaDBQangwWlhoMElIZzlJakV3SWlCNVBTSXhOakFpSUdOc1lYTnpQU0ppWVhObElqNUhiMnhrSUZKcGJtYzhMM1JsZUhRK1BDOXpkbWMrIn0=",
        "tokenURL": "data:application/json;base64,eyJuYW1lIjogIkJhZyAjMSIsICJkZXNjcmlwdGlvbiI6ICJMb290IGlzIHJhbmRvbWl6ZWQgYWR2ZW50dXJlciBnZWFyIGdlbmVyYXRlZCBhbmQgc3RvcmVkIG9uIGNoYWluLiBTdGF0cywgaW1hZ2VzLCBhbmQgb3RoZXIgZnVuY3Rpb25hbGl0eSBhcmUgaW50ZW50aW9uYWxseSBvbWl0dGVkIGZvciBvdGhlcnMgdG8gaW50ZXJwcmV0LiBGZWVsIGZyZWUgdG8gdXNlIExvb3QgaW4gYW55IHdheSB5b3Ugd2FudC4iLCAiaW1hZ2UiOiAiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhCeVpYTmxjblpsUVhOd1pXTjBVbUYwYVc4OUluaE5hVzVaVFdsdUlHMWxaWFFpSUhacFpYZENiM2c5SWpBZ01DQXpOVEFnTXpVd0lqNDhjM1I1YkdVK0xtSmhjMlVnZXlCbWFXeHNPaUIzYUdsMFpUc2dabTl1ZEMxbVlXMXBiSGs2SUhObGNtbG1PeUJtYjI1MExYTnBlbVU2SURFMGNIZzdJSDA4TDNOMGVXeGxQanh5WldOMElIZHBaSFJvUFNJeE1EQWxJaUJvWldsbmFIUTlJakV3TUNVaUlHWnBiR3c5SW1Kc1lXTnJJaUF2UGp4MFpYaDBJSGc5SWpFd0lpQjVQU0l5TUNJZ1kyeGhjM005SW1KaGMyVWlQaUpIY21sdElGTm9iM1YwSWlCSGNtRjJaU0JYWVc1a0lHOW1JRk5yYVd4c0lDc3hQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJME1DSWdZMnhoYzNNOUltSmhjMlVpUGtoaGNtUWdUR1ZoZEdobGNpQkJjbTF2Y2p3dmRHVjRkRDQ4ZEdWNGRDQjRQU0l4TUNJZ2VUMGlOakFpSUdOc1lYTnpQU0ppWVhObElqNUVhWFpwYm1VZ1NHOXZaRHd2ZEdWNGRENDhkR1Y0ZENCNFBTSXhNQ0lnZVQwaU9EQWlJR05zWVhOelBTSmlZWE5sSWo1SVlYSmtJRXhsWVhSb1pYSWdRbVZzZER3dmRHVjRkRDQ4ZEdWNGRDQjRQU0l4TUNJZ2VUMGlNVEF3SWlCamJHRnpjejBpWW1GelpTSStJa1JsWVhSb0lGSnZiM1FpSUU5eWJtRjBaU0JIY21WaGRtVnpJRzltSUZOcmFXeHNQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJeE1qQWlJR05zWVhOelBTSmlZWE5sSWo1VGRIVmtaR1ZrSUV4bFlYUm9aWElnUjJ4dmRtVnpQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJeE5EQWlJR05zWVhOelBTSmlZWE5sSWo1T1pXTnJiR0ZqWlNCdlppQkZibXhwWjJoMFpXNXRaVzUwUEM5MFpYaDBQangwWlhoMElIZzlJakV3SWlCNVBTSXhOakFpSUdOc1lYTnpQU0ppWVhObElqNUhiMnhrSUZKcGJtYzhMM1JsZUhRK1BDOXpkbWMrIn0=",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for Settlements ${SETTLEMENTS_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(SETTLEMENTS_TOKEN_ADDRESS, '1')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "Size",
            "value": "Hamlet",
          },
          Object {
            "trait_type": "Spirit",
            "value": "Fire",
          },
          Object {
            "trait_type": "Age",
            "value": "Ancient",
          },
          Object {
            "trait_type": "Resource",
            "value": "Wood",
          },
          Object {
            "trait_type": "Morale",
            "value": "Expectant",
          },
          Object {
            "trait_type": "Government",
            "value": "Aristocracy",
          },
          Object {
            "trait_type": "Realm",
            "value": "Genesis",
          },
        ],
        "contentURL": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LnR4dCB7IGZpbGw6IGJsYWNrOyBmb250LWZhbWlseTogbW9ub3NwYWNlOyBmb250LXNpemU6IDEycHg7fTwvc3R5bGU+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0id2hpdGUiIC8+PHRleHQgeD0iMTAiIHk9IjIwIiBjbGFzcz0idHh0Ij5IYW1sZXQ8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjQwIiBjbGFzcz0idHh0Ij5GaXJlPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSI2MCIgY2xhc3M9InR4dCI+QW5jaWVudDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iODAiIGNsYXNzPSJ0eHQiPldvb2Q8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjEwMCIgY2xhc3M9InR4dCI+RXhwZWN0YW50PC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxMjAiIGNsYXNzPSJ0eHQiPkFyaXN0b2NyYWN5PC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNDAiIGNsYXNzPSJ0eHQiPkdlbmVzaXM8L3RleHQ+PC9zdmc+",
        "contentURLMimeType": "image/svg+xml",
        "description": "Settlements are a turn based civilisation simulator stored entirely on chain, go forth and conquer.",
        "imageURL": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LnR4dCB7IGZpbGw6IGJsYWNrOyBmb250LWZhbWlseTogbW9ub3NwYWNlOyBmb250LXNpemU6IDEycHg7fTwvc3R5bGU+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0id2hpdGUiIC8+PHRleHQgeD0iMTAiIHk9IjIwIiBjbGFzcz0idHh0Ij5IYW1sZXQ8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjQwIiBjbGFzcz0idHh0Ij5GaXJlPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSI2MCIgY2xhc3M9InR4dCI+QW5jaWVudDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iODAiIGNsYXNzPSJ0eHQiPldvb2Q8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjEwMCIgY2xhc3M9InR4dCI+RXhwZWN0YW50PC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxMjAiIGNsYXNzPSJ0eHQiPkFyaXN0b2NyYWN5PC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNDAiIGNsYXNzPSJ0eHQiPkdlbmVzaXM8L3RleHQ+PC9zdmc+",
        "imageURLMimeType": "image/svg+xml",
        "metadata": Object {
          "attributes": Array [
            Object {
              "trait_type": "Size",
              "value": "Hamlet",
            },
            Object {
              "trait_type": "Spirit",
              "value": "Fire",
            },
            Object {
              "trait_type": "Age",
              "value": "Ancient",
            },
            Object {
              "trait_type": "Resource",
              "value": "Wood",
            },
            Object {
              "trait_type": "Morale",
              "value": "Expectant",
            },
            Object {
              "trait_type": "Government",
              "value": "Aristocracy",
            },
            Object {
              "trait_type": "Realm",
              "value": "Genesis",
            },
          ],
          "description": "Settlements are a turn based civilisation simulator stored entirely on chain, go forth and conquer.",
          "image": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LnR4dCB7IGZpbGw6IGJsYWNrOyBmb250LWZhbWlseTogbW9ub3NwYWNlOyBmb250LXNpemU6IDEycHg7fTwvc3R5bGU+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0id2hpdGUiIC8+PHRleHQgeD0iMTAiIHk9IjIwIiBjbGFzcz0idHh0Ij5IYW1sZXQ8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjQwIiBjbGFzcz0idHh0Ij5GaXJlPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSI2MCIgY2xhc3M9InR4dCI+QW5jaWVudDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iODAiIGNsYXNzPSJ0eHQiPldvb2Q8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjEwMCIgY2xhc3M9InR4dCI+RXhwZWN0YW50PC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxMjAiIGNsYXNzPSJ0eHQiPkFyaXN0b2NyYWN5PC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNDAiIGNsYXNzPSJ0eHQiPkdlbmVzaXM8L3RleHQ+PC9zdmc+",
          "name": "Settlement #1",
        },
        "name": "Settlement #1",
        "tokenAddress": "0xdEcC60000ba66700a009b8F9F7D82676B5cfA88A",
        "tokenId": "1",
        "tokenURI": "data:application/json;base64,eyJuYW1lIjogIlNldHRsZW1lbnQgIzEiLCAiZGVzY3JpcHRpb24iOiAiU2V0dGxlbWVudHMgYXJlIGEgdHVybiBiYXNlZCBjaXZpbGlzYXRpb24gc2ltdWxhdG9yIHN0b3JlZCBlbnRpcmVseSBvbiBjaGFpbiwgZ28gZm9ydGggYW5kIGNvbnF1ZXIuIiwgImltYWdlIjogImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIQnlaWE5sY25abFFYTndaV04wVW1GMGFXODlJbmhOYVc1WlRXbHVJRzFsWlhRaUlIWnBaWGRDYjNnOUlqQWdNQ0F6TlRBZ016VXdJajQ4YzNSNWJHVStMblI0ZENCN0lHWnBiR3c2SUdKc1lXTnJPeUJtYjI1MExXWmhiV2xzZVRvZ2JXOXViM053WVdObE95Qm1iMjUwTFhOcGVtVTZJREV5Y0hnN2ZUd3ZjM1I1YkdVK1BISmxZM1FnZDJsa2RHZzlJakV3TUNVaUlHaGxhV2RvZEQwaU1UQXdKU0lnWm1sc2JEMGlkMmhwZEdVaUlDOCtQSFJsZUhRZ2VEMGlNVEFpSUhrOUlqSXdJaUJqYkdGemN6MGlkSGgwSWo1SVlXMXNaWFE4TDNSbGVIUStQSFJsZUhRZ2VEMGlNVEFpSUhrOUlqUXdJaUJqYkdGemN6MGlkSGgwSWo1R2FYSmxQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJMk1DSWdZMnhoYzNNOUluUjRkQ0krUVc1amFXVnVkRHd2ZEdWNGRENDhkR1Y0ZENCNFBTSXhNQ0lnZVQwaU9EQWlJR05zWVhOelBTSjBlSFFpUGxkdmIyUThMM1JsZUhRK1BIUmxlSFFnZUQwaU1UQWlJSGs5SWpFd01DSWdZMnhoYzNNOUluUjRkQ0krUlhod1pXTjBZVzUwUEM5MFpYaDBQangwWlhoMElIZzlJakV3SWlCNVBTSXhNakFpSUdOc1lYTnpQU0owZUhRaVBrRnlhWE4wYjJOeVlXTjVQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJeE5EQWlJR05zWVhOelBTSjBlSFFpUGtkbGJtVnphWE04TDNSbGVIUStQQzl6ZG1jKyIsImF0dHJpYnV0ZXMiOlt7ICJ0cmFpdF90eXBlIjogIlNpemUiLCAidmFsdWUiOiAiSGFtbGV0IiB9LCB7ICJ0cmFpdF90eXBlIjogIlNwaXJpdCIsICJ2YWx1ZSI6ICJGaXJlIiB9LCB7ICJ0cmFpdF90eXBlIjogIkFnZSIsICJ2YWx1ZSI6ICJBbmNpZW50IiB9LCB7ICJ0cmFpdF90eXBlIjogIlJlc291cmNlIiwgInZhbHVlIjogIldvb2QiIH0sIHsgInRyYWl0X3R5cGUiOiAiTW9yYWxlIiwgInZhbHVlIjogIkV4cGVjdGFudCIgfSwgeyAidHJhaXRfdHlwZSI6ICJHb3Zlcm5tZW50IiwgInZhbHVlIjogIkFyaXN0b2NyYWN5IiB9LCB7ICJ0cmFpdF90eXBlIjogIlJlYWxtIiwgInZhbHVlIjogIkdlbmVzaXMiIH1dfQ==",
        "tokenURL": "data:application/json;base64,eyJuYW1lIjogIlNldHRsZW1lbnQgIzEiLCAiZGVzY3JpcHRpb24iOiAiU2V0dGxlbWVudHMgYXJlIGEgdHVybiBiYXNlZCBjaXZpbGlzYXRpb24gc2ltdWxhdG9yIHN0b3JlZCBlbnRpcmVseSBvbiBjaGFpbiwgZ28gZm9ydGggYW5kIGNvbnF1ZXIuIiwgImltYWdlIjogImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIQnlaWE5sY25abFFYTndaV04wVW1GMGFXODlJbmhOYVc1WlRXbHVJRzFsWlhRaUlIWnBaWGRDYjNnOUlqQWdNQ0F6TlRBZ016VXdJajQ4YzNSNWJHVStMblI0ZENCN0lHWnBiR3c2SUdKc1lXTnJPeUJtYjI1MExXWmhiV2xzZVRvZ2JXOXViM053WVdObE95Qm1iMjUwTFhOcGVtVTZJREV5Y0hnN2ZUd3ZjM1I1YkdVK1BISmxZM1FnZDJsa2RHZzlJakV3TUNVaUlHaGxhV2RvZEQwaU1UQXdKU0lnWm1sc2JEMGlkMmhwZEdVaUlDOCtQSFJsZUhRZ2VEMGlNVEFpSUhrOUlqSXdJaUJqYkdGemN6MGlkSGgwSWo1SVlXMXNaWFE4TDNSbGVIUStQSFJsZUhRZ2VEMGlNVEFpSUhrOUlqUXdJaUJqYkdGemN6MGlkSGgwSWo1R2FYSmxQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJMk1DSWdZMnhoYzNNOUluUjRkQ0krUVc1amFXVnVkRHd2ZEdWNGRENDhkR1Y0ZENCNFBTSXhNQ0lnZVQwaU9EQWlJR05zWVhOelBTSjBlSFFpUGxkdmIyUThMM1JsZUhRK1BIUmxlSFFnZUQwaU1UQWlJSGs5SWpFd01DSWdZMnhoYzNNOUluUjRkQ0krUlhod1pXTjBZVzUwUEM5MFpYaDBQangwWlhoMElIZzlJakV3SWlCNVBTSXhNakFpSUdOc1lYTnpQU0owZUhRaVBrRnlhWE4wYjJOeVlXTjVQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJeE5EQWlJR05zWVhOelBTSjBlSFFpUGtkbGJtVnphWE04TDNSbGVIUStQQzl6ZG1jKyIsImF0dHJpYnV0ZXMiOlt7ICJ0cmFpdF90eXBlIjogIlNpemUiLCAidmFsdWUiOiAiSGFtbGV0IiB9LCB7ICJ0cmFpdF90eXBlIjogIlNwaXJpdCIsICJ2YWx1ZSI6ICJGaXJlIiB9LCB7ICJ0cmFpdF90eXBlIjogIkFnZSIsICJ2YWx1ZSI6ICJBbmNpZW50IiB9LCB7ICJ0cmFpdF90eXBlIjogIlJlc291cmNlIiwgInZhbHVlIjogIldvb2QiIH0sIHsgInRyYWl0X3R5cGUiOiAiTW9yYWxlIiwgInZhbHVlIjogIkV4cGVjdGFudCIgfSwgeyAidHJhaXRfdHlwZSI6ICJHb3Zlcm5tZW50IiwgInZhbHVlIjogIkFyaXN0b2NyYWN5IiB9LCB7ICJ0cmFpdF90eXBlIjogIlJlYWxtIiwgInZhbHVlIjogIkdlbmVzaXMiIH1dfQ==",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for Blitmap ${BLITMAP_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(BLITMAP_TOKEN_ADDRESS, '1')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "Type",
            "value": "Original",
          },
          Object {
            "trait_type": "Composition",
            "value": "Rose (#1)",
          },
          Object {
            "trait_type": "Palette",
            "value": "Rose (#1)",
          },
          Object {
            "trait_type": "Affinity",
            "value": "Fire III",
          },
          Object {
            "trait_type": "Slabs",
            "value": "◢ ◢ ◢ ◥",
          },
          Object {
            "trait_type": "Attunement",
            "value": "Unattuned",
          },
        ],
        "contentURL": "https://api.blitmap.com/v1/png/1",
        "contentURLMimeType": "image/png",
        "description": "Blitmap is a community crafted art collection and universe. All data is completely on chain.

      [blitmap.com](https://www.blitmap.com)",
        "imageURL": "https://api.blitmap.com/v1/png/1",
        "imageURLMimeType": "image/png",
        "metadata": Object {
          "attributes": Array [
            Object {
              "trait_type": "Type",
              "value": "Original",
            },
            Object {
              "trait_type": "Composition",
              "value": "Rose (#1)",
            },
            Object {
              "trait_type": "Palette",
              "value": "Rose (#1)",
            },
            Object {
              "trait_type": "Affinity",
              "value": "Fire III",
            },
            Object {
              "trait_type": "Slabs",
              "value": "◢ ◢ ◢ ◥",
            },
            Object {
              "trait_type": "Attunement",
              "value": "Unattuned",
            },
          ],
          "description": "Blitmap is a community crafted art collection and universe. All data is completely on chain.

      [blitmap.com](https://www.blitmap.com)",
          "image": "https://api.blitmap.com/v1/png/1",
          "name": "#1 - Rose",
        },
        "name": "#1 - Rose",
        "tokenAddress": "0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63",
        "tokenId": "1",
        "tokenURI": "https://api.blitmap.com/v1/metadata/1",
        "tokenURL": "https://api.blitmap.com/v1/metadata/1",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  fit(`should be able to fetch and parse metadata for Blitnauts ${BLITNAUT_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(BLITNAUT_TOKEN_ADDRESS, '1')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "Base",
            "value": "Quark",
          },
          Object {
            "trait_type": "Edition",
            "value": "Beta",
          },
          Object {
            "trait_type": "Blitmap",
            "value": "#135 - Genesis Blit",
          },
          Object {
            "trait_type": "Blitmap Composition",
            "value": "#0 - Genesis",
          },
          Object {
            "trait_type": "Blitmap Palette",
            "value": "#42 - Blit",
          },
        ],
        "contentURL": "https://blitnauts.blitmap.com/api/v1/img/1",
        "contentURLMimeType": "image/png",
        "description": "Blitnauts are a faction of sentient robots sworn to locate and protect the Blitmaps, and the heroes of our world.",
        "externalURL": "https://blitnauts.blitmap.com/blitnauts/1",
        "imageURL": "https://blitnauts.blitmap.com/api/v1/img/1",
        "imageURLMimeType": "image/png",
        "metadata": Object {
          "attributes": Array [
            Object {
              "trait_type": "Base",
              "value": "Quark",
            },
            Object {
              "trait_type": "Edition",
              "value": "Beta",
            },
            Object {
              "trait_type": "Blitmap",
              "value": "#135 - Genesis Blit",
            },
            Object {
              "trait_type": "Blitmap Composition",
              "value": "#0 - Genesis",
            },
            Object {
              "trait_type": "Blitmap Palette",
              "value": "#42 - Blit",
            },
          ],
          "description": "Blitnauts are a faction of sentient robots sworn to locate and protect the Blitmaps, and the heroes of our world.",
          "external_url": "https://blitnauts.blitmap.com/blitnauts/1",
          "image": "https://blitnauts.blitmap.com/api/v1/img/1",
          "name": "#1 - Quark Beta",
        },
        "name": "#1 - Quark Beta",
        "tokenAddress": "0x448f3219CF2A23b0527A7a0158e7264B87f635Db",
        "tokenId": "1",
        "tokenURI": "https://blitnauts.blitmap.com/api/v1/metadata/1",
        "tokenURL": "https://blitnauts.blitmap.com/api/v1/metadata/1",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for Known Origin ${KNOWN_ORIGIN_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(
      KNOWN_ORIGIN_TOKEN_ADDRESS,
      '219184',
    )
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "artist",
            "value": "XCOPY",
          },
          Object {
            "trait_type": "scarcity",
            "value": "rare",
          },
          Object {
            "trait_type": "tags",
            "value": Array [
              "doomed",
              "KnownOrigin",
              "cryptoart",
              "hope",
              "skull",
              "technology",
            ],
          },
          Object {
            "trait_type": "asset_type",
            "value": "image/gif",
          },
          Object {
            "trait_type": "asset_size_in_bytes",
            "value": 621118,
          },
        ],
        "contentURL": "https://gateway.ipfs.io/ipfs/QmXKQXNLe16vjuBPAAkw8fWaFBwAPjrVJtijvovbJv7tTJ/asset.gif",
        "contentURLMimeType": "image/gif",
        "description": "Tech still won't save us",
        "imageURL": "https://gateway.ipfs.io/ipfs/QmXKQXNLe16vjuBPAAkw8fWaFBwAPjrVJtijvovbJv7tTJ/asset.gif",
        "imageURLMimeType": "image/gif",
        "metadata": Object {
          "artist": "0x3768225622d53ffcc1e00eac53a2a870ecd825c8",
          "attributes": Object {
            "artist": "XCOPY",
            "asset_size_in_bytes": 621118,
            "asset_type": "image/gif",
            "scarcity": "rare",
            "tags": Array [
              "doomed",
              "KnownOrigin",
              "cryptoart",
              "hope",
              "skull",
              "technology",
            ],
          },
          "description": "Tech still won't save us",
          "external_uri": "https://knownorigin.io/0x3768225622d53ffcc1e00eac53a2a870ecd825c8",
          "image": "https://ipfs.infura.io/ipfs/QmXKQXNLe16vjuBPAAkw8fWaFBwAPjrVJtijvovbJv7tTJ/asset.gif",
          "name": "The Doomed (red)",
        },
        "name": "The Doomed (red)",
        "tokenAddress": "0xFBeef911Dc5821886e1dda71586d90eD28174B7d",
        "tokenId": "219184",
        "tokenURI": "https://ipfs.infura.io/ipfs/QmYHU3Yc5QLiNHCDGA9Wn5cEW6hiRb64JGLdvUis9xrb8L",
        "tokenURL": "https://gateway.ipfs.io/ipfs/QmYHU3Yc5QLiNHCDGA9Wn5cEW6hiRb64JGLdvUis9xrb8L",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for Art Blocks Curated ${ART_BLOCKS_CURATED_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(
      ART_BLOCKS_CURATED_TOKEN_ADDRESS,
      '100',
    )
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "Chromie Squiggle",
            "value": "All Chromie Squiggles",
          },
          Object {
            "trait_type": "Chromie Squiggle",
            "value": "Type: Normal",
          },
          Object {
            "trait_type": "Chromie Squiggle",
            "value": "Height: 4",
          },
          Object {
            "trait_type": "Chromie Squiggle",
            "value": "Segments: 15",
          },
          Object {
            "trait_type": "Chromie Squiggle",
            "value": "Spectrum: Normal",
          },
          Object {
            "trait_type": "Chromie Squiggle",
            "value": "Color Spread: 37",
          },
          Object {
            "trait_type": "Chromie Squiggle",
            "value": "Steps Between: 200",
          },
          Object {
            "trait_type": "Chromie Squiggle",
            "value": "Color Direction: Forward",
          },
        ],
        "contentURL": "https://generator.artblocks.io/100",
        "contentURLMimeType": "text/html; charset=utf-8",
        "description": "Simple and easily identifiable, each squiggle embodies the soul of the Art Blocks platform. Consider each my personal signature as an artist, developer, and tinkerer. Public minting of the Chromie Squiggle is permanently paused. They are now reserved for manual distribution to collectors and community members over a longer period of time. Please visit OpenSea to explore Squiggles available on the secondary market. ",
        "externalURL": "https://artblocks.io/token/100",
        "imageURL": "https://media.artblocks.io/100.png",
        "imageURLMimeType": "image/png",
        "metadata": Object {
          "animation_url": "https://generator.artblocks.io/100",
          "artist": "Snowfro",
          "aspect_ratio": "1.5",
          "collection_name": "Chromie Squiggle by Snowfro",
          "curation_status": "curated",
          "description": "Simple and easily identifiable, each squiggle embodies the soul of the Art Blocks platform. Consider each my personal signature as an artist, developer, and tinkerer. Public minting of the Chromie Squiggle is permanently paused. They are now reserved for manual distribution to collectors and community members over a longer period of time. Please visit OpenSea to explore Squiggles available on the secondary market. ",
          "external_url": "https://artblocks.io/token/100",
          "features": Object {
            "Color Direction": "Forward",
            "Color Spread": 37,
            "End Color": 160,
            "Height": 4,
            "Segments": 15,
            "Spectrum": "Normal",
            "Start Color": 79,
            "Steps Between": 200,
            "Type": "Normal",
          },
          "image": "https://media.artblocks.io/100.png",
          "interactive_nft": Object {
            "code_uri": "https://generator.artblocks.io/100",
            "version": "0.0.9",
          },
          "is_dynamic": true,
          "license": "NFT License",
          "name": "Chromie Squiggle #100",
          "payout_address": "0x6C093Fe8bc59e1e0cAe2Ec10F0B717D3D182056B",
          "platform": "Art Blocks Curated",
          "royaltyInfo": Object {
            "additionalPayee": "0x9d5025b327e6b863e5050141c987d988c07fd8b2",
            "additionalPayeePercentage": "100",
            "artistAddress": "0xb998a2520907ed1fc0f9f457b2219fb2720466cd",
            "royaltyFeeByID": "5",
          },
          "script_type": "p5js",
          "series": 1,
          "tokenID": "100",
          "token_hash": "0x4941d7531cd44049c7c7396a47effe02250945947ea2b091a00462ffba4f8186",
          "traits": Array [
            Object {
              "trait_type": "Chromie Squiggle",
              "value": "All Chromie Squiggles",
            },
            Object {
              "trait_type": "Chromie Squiggle",
              "value": "Type: Normal",
            },
            Object {
              "trait_type": "Chromie Squiggle",
              "value": "Height: 4",
            },
            Object {
              "trait_type": "Chromie Squiggle",
              "value": "Segments: 15",
            },
            Object {
              "trait_type": "Chromie Squiggle",
              "value": "Spectrum: Normal",
            },
            Object {
              "trait_type": "Chromie Squiggle",
              "value": "Color Spread: 37",
            },
            Object {
              "trait_type": "Chromie Squiggle",
              "value": "Steps Between: 200",
            },
            Object {
              "trait_type": "Chromie Squiggle",
              "value": "Color Direction: Forward",
            },
          ],
          "website": "https://www.twitter.com/artonblockchain",
        },
        "name": "Chromie Squiggle #100",
        "tokenAddress": "0x059EDD72Cd353dF5106D2B9cC5ab83a52287aC3a",
        "tokenId": "100",
        "tokenURI": "https://api.artblocks.io/token/100",
        "tokenURL": "https://api.artblocks.io/token/100",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for Art Blocks Default ${ART_BLOCKS_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(
      ART_BLOCKS_TOKEN_ADDRESS,
      '167000537',
    )
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "Blaschke Ballet",
            "value": "All Blaschke Ballets",
          },
          Object {
            "trait_type": "Blaschke Ballet",
            "value": "Rang: Chassé",
          },
          Object {
            "trait_type": "Blaschke Ballet",
            "value": "Ballet: Le Casse-Noisette",
          },
          Object {
            "trait_type": "Blaschke Ballet",
            "value": "Collant: Dégagé",
          },
          Object {
            "trait_type": "Blaschke Ballet",
            "value": "Fluidité: Adagio",
          },
          Object {
            "trait_type": "Blaschke Ballet",
            "value": "Mouvement: Balançoire",
          },
          Object {
            "trait_type": "Blaschke Ballet",
            "value": "Ballerines: Vingt",
          },
        ],
        "contentURL": "https://generator.artblocks.io/167000537",
        "contentURLMimeType": "text/html; charset=utf-8",
        "description": "Blaschke Ballet is a reflection on movement, color, and mathematics - a juxtaposition of graceful motion and precise calculation. Observe the elegant ballerinas as they leap through the complex plane, the space between them constantly collapsing and reassembling.",
        "externalURL": "https://artblocks.io/token/167000537",
        "imageURL": "https://media.artblocks.io/167000537.png",
        "imageURLMimeType": "image/png",
        "metadata": Object {
          "animation_url": "https://generator.artblocks.io/167000537",
          "artist": "NumbersInMotion",
          "aspect_ratio": 1,
          "collection_name": "Blaschke Ballet by NumbersInMotion",
          "curation_status": "playground",
          "description": "Blaschke Ballet is a reflection on movement, color, and mathematics - a juxtaposition of graceful motion and precise calculation. Observe the elegant ballerinas as they leap through the complex plane, the space between them constantly collapsing and reassembling.",
          "external_url": "https://artblocks.io/token/167000537",
          "features": Object {
            "Ballerines": "Vingt",
            "Ballet": "Le Casse-Noisette",
            "Collant": "Dégagé",
            "Fluidité": "Adagio",
            "Mouvement": "Balançoire",
            "Rang": "Chassé",
          },
          "image": "https://media.artblocks.io/167000537.png",
          "interactive_nft": Object {
            "code_uri": "https://generator.artblocks.io/167000537",
            "version": "0.0.9",
          },
          "is_dynamic": true,
          "license": "CC BY-NC 4.0",
          "name": "Blaschke Ballet #537",
          "payout_address": "0x6C093Fe8bc59e1e0cAe2Ec10F0B717D3D182056B",
          "platform": "Art Blocks Playground",
          "royaltyInfo": Object {
            "additionalPayee": "0x0000000000000000000000000000000000000000",
            "additionalPayeePercentage": "0",
            "artistAddress": "0xf565d79c35758c752d3debfdd380d4eb16a3c6e3",
            "royaltyFeeByID": "5",
          },
          "script_type": "p5js",
          "series": "N/A",
          "tokenID": "167000537",
          "token_hash": "0x0737aaf82a4f11a08e2fcfa467bd74a34a754c33ceaa27a650c7830b3a3a7231",
          "traits": Array [
            Object {
              "trait_type": "Blaschke Ballet",
              "value": "All Blaschke Ballets",
            },
            Object {
              "trait_type": "Blaschke Ballet",
              "value": "Rang: Chassé",
            },
            Object {
              "trait_type": "Blaschke Ballet",
              "value": "Ballet: Le Casse-Noisette",
            },
            Object {
              "trait_type": "Blaschke Ballet",
              "value": "Collant: Dégagé",
            },
            Object {
              "trait_type": "Blaschke Ballet",
              "value": "Fluidité: Adagio",
            },
            Object {
              "trait_type": "Blaschke Ballet",
              "value": "Mouvement: Balançoire",
            },
            Object {
              "trait_type": "Blaschke Ballet",
              "value": "Ballerines: Vingt",
            },
          ],
          "website": "https://www.instagram.com/numbersinmotion/",
        },
        "name": "Blaschke Ballet #537",
        "tokenAddress": "0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270",
        "tokenId": "167000537",
        "tokenURI": "https://api.artblocks.io/token/167000537",
        "tokenURL": "https://api.artblocks.io/token/167000537",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for Makersplace ${MAKERSPLACE_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(MAKERSPLACE_TOKEN_ADDRESS, '63253')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "name",
            "value": Object {
              "description": "We Are Made of Stardust",
              "type": "string",
            },
          },
          Object {
            "trait_type": "description",
            "value": Object {
              "description": "We are the cosmos made conscious. We are consciousness incarnated in stardust. \\"We inhabit a universe where atoms are made in the centers of stars; where each second a thousand suns are born; where the raw material for biological evolution is sometimes made by the explosion of a star halfway across the Milky Way; where a thing as beautiful as a galaxy is formed a hundred billion times . We are the local embodiment of a Cosmos grown to self-awareness. We have begun to contemplate our origins: stardust pondering the stars; organized assemblages of ten billion billion billion atoms considering the evolution of atoms; tracing the long journey by which, here at least, consciousness arose. Not only are we made of stardust; we’re made of elements so fundamental to the universe they were created in the first moments of the Big Bang. The history inside of us stretches back further than we knew and our future remains inescapably among the stars. We are the universe trying to understand itself\\"",
              "type": "string",
            },
          },
          Object {
            "trait_type": "preview_media_file",
            "value": Object {
              "description": "https://ipfsgateway.makersplace.com/ipfs/QmeSH3ap2VCN6KgL4U8ebvrYrWBKPYffJsAbAUiHk9qSik",
              "type": "string",
            },
          },
          Object {
            "trait_type": "preview_media_file_type",
            "value": Object {
              "description": "jpg",
              "type": "string",
            },
          },
          Object {
            "trait_type": "created_at",
            "value": Object {
              "description": "2021-06-16T18:31:20.779279+00:00",
              "type": "datetime",
            },
          },
          Object {
            "trait_type": "total_supply",
            "value": Object {
              "description": 1,
              "type": "int",
            },
          },
          Object {
            "trait_type": "digital_media_signature_type",
            "value": Object {
              "description": "SHA-256",
              "type": "string",
            },
          },
          Object {
            "trait_type": "digital_media_signature",
            "value": Object {
              "description": "da6a09de80950dfbb2ae9bbd00db117e08d9ee2d93a6d4445b9490a27539310e",
              "type": "string",
            },
          },
          Object {
            "trait_type": "preview_media_file2",
            "value": Object {
              "description": "https://ipfsgateway.makersplace.com/ipfs/QmbhDKcf4fqtjXQvWmSyJT2pU1pYwCoa1wWVkTurBvkBcV",
              "type": "string",
            },
          },
          Object {
            "trait_type": "preview_media_file2_type",
            "value": Object {
              "description": "mp4",
              "type": "string",
            },
          },
        ],
        "contentURL": "https://ipfsgateway.makersplace.com/ipfs/QmbhDKcf4fqtjXQvWmSyJT2pU1pYwCoa1wWVkTurBvkBcV",
        "contentURLMimeType": "video/mp4",
        "description": "We are the cosmos made conscious. We are consciousness incarnated in stardust. \\"We inhabit a universe where atoms are made in the centers of stars; where each second a thousand suns are born; where the raw material for biological evolution is sometimes made by the explosion of a star halfway across the Milky Way; where a thing as beautiful as a galaxy is formed a hundred billion times . We are the local embodiment of a Cosmos grown to self-awareness. We have begun to contemplate our origins: stardust pondering the stars; organized assemblages of ten billion billion billion atoms considering the evolution of atoms; tracing the long journey by which, here at least, consciousness arose. Not only are we made of stardust; we’re made of elements so fundamental to the universe they were created in the first moments of the Big Bang. The history inside of us stretches back further than we knew and our future remains inescapably among the stars. We are the universe trying to understand itself\\"",
        "metadata": Object {
          "attributes": Array [
            Object {
              "trait_type": "Creator",
              "value": "Reema",
            },
          ],
          "description": "We are the cosmos made conscious. We are consciousness incarnated in stardust. \\"We inhabit a universe where atoms are made in the centers of stars; where each second a thousand suns are born; where the raw material for biological evolution is sometimes made by the explosion of a star halfway across the Milky Way; where a thing as beautiful as a galaxy is formed a hundred billion times . We are the local embodiment of a Cosmos grown to self-awareness. We have begun to contemplate our origins: stardust pondering the stars; organized assemblages of ten billion billion billion atoms considering the evolution of atoms; tracing the long journey by which, here at least, consciousness arose. Not only are we made of stardust; we’re made of elements so fundamental to the universe they were created in the first moments of the Big Bang. The history inside of us stretches back further than we knew and our future remains inescapably among the stars. We are the universe trying to understand itself\\"",
          "imageUrl": "https://ipfsgateway.makersplace.com/ipfs/QmeSH3ap2VCN6KgL4U8ebvrYrWBKPYffJsAbAUiHk9qSik",
          "name": "We Are Made of Stardust",
          "properties": Object {
            "created_at": Object {
              "description": "2021-06-16T18:31:20.779279+00:00",
              "type": "datetime",
            },
            "description": Object {
              "description": "We are the cosmos made conscious. We are consciousness incarnated in stardust. \\"We inhabit a universe where atoms are made in the centers of stars; where each second a thousand suns are born; where the raw material for biological evolution is sometimes made by the explosion of a star halfway across the Milky Way; where a thing as beautiful as a galaxy is formed a hundred billion times . We are the local embodiment of a Cosmos grown to self-awareness. We have begun to contemplate our origins: stardust pondering the stars; organized assemblages of ten billion billion billion atoms considering the evolution of atoms; tracing the long journey by which, here at least, consciousness arose. Not only are we made of stardust; we’re made of elements so fundamental to the universe they were created in the first moments of the Big Bang. The history inside of us stretches back further than we knew and our future remains inescapably among the stars. We are the universe trying to understand itself\\"",
              "type": "string",
            },
            "digital_media_signature": Object {
              "description": "da6a09de80950dfbb2ae9bbd00db117e08d9ee2d93a6d4445b9490a27539310e",
              "type": "string",
            },
            "digital_media_signature_type": Object {
              "description": "SHA-256",
              "type": "string",
            },
            "name": Object {
              "description": "We Are Made of Stardust",
              "type": "string",
            },
            "preview_media_file": Object {
              "description": "https://ipfsgateway.makersplace.com/ipfs/QmeSH3ap2VCN6KgL4U8ebvrYrWBKPYffJsAbAUiHk9qSik",
              "type": "string",
            },
            "preview_media_file2": Object {
              "description": "https://ipfsgateway.makersplace.com/ipfs/QmbhDKcf4fqtjXQvWmSyJT2pU1pYwCoa1wWVkTurBvkBcV",
              "type": "string",
            },
            "preview_media_file2_type": Object {
              "description": "mp4",
              "type": "string",
            },
            "preview_media_file_type": Object {
              "description": "jpg",
              "type": "string",
            },
            "total_supply": Object {
              "description": 1,
              "type": "int",
            },
          },
          "title": "We Are Made of Stardust",
          "type": "object",
        },
        "name": "We Are Made of Stardust",
        "tokenAddress": "0x2A46f2fFD99e19a89476E2f62270e0a35bBf0756",
        "tokenId": "63253",
        "tokenURI": "ipfs://ipfs/QmczR8BYHGsfMjiQ988mhrQo4Femozf4RoVsqu8PjxFMNU",
        "tokenURL": "https://ipfsgateway.makersplace.com/ipfs/QmczR8BYHGsfMjiQ988mhrQo4Femozf4RoVsqu8PjxFMNU",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for Foundation ${FOUNDATION_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(FOUNDATION_TOKEN_ADDRESS, '63253')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "contentURL": "https://ipfs.foundation.app/ipfs/QmYpdbauWs12W9HDsTeTXKJ1wGL3JeRrCjzLSV56dXzxgp/nft.jpg",
        "contentURLMimeType": "image/jpeg",
        "description": "The last door is here. We have visited 3 dimensions already but we still looking for the perfect one to stay. Is this the light of a new day or it is the one leaving? Is this the one that we've been looking for all along? 
      In this last entry of the series we finally see that after dark there's always a light and that no matter what happens we will find a way out",
        "imageURL": "https://ipfs.foundation.app/ipfs/QmYpdbauWs12W9HDsTeTXKJ1wGL3JeRrCjzLSV56dXzxgp/nft.jpg",
        "imageURLMimeType": "image/jpeg",
        "metadata": Object {
          "description": "The last door is here. We have visited 3 dimensions already but we still looking for the perfect one to stay. Is this the light of a new day or it is the one leaving? Is this the one that we've been looking for all along? 
      In this last entry of the series we finally see that after dark there's always a light and that no matter what happens we will find a way out",
          "image": "ipfs://QmYpdbauWs12W9HDsTeTXKJ1wGL3JeRrCjzLSV56dXzxgp/nft.jpg",
          "name": "Dimensions III",
        },
        "name": "Dimensions III",
        "tokenAddress": "0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405",
        "tokenId": "63253",
        "tokenURI": "https://ipfs.foundation.app/ipfs/QmcUh1Suak814TqXUJjGveUQG4CVumiCLQPvqKzJBMFxWA/metadata.json",
        "tokenURL": "https://ipfs.foundation.app/ipfs/QmcUh1Suak814TqXUJjGveUQG4CVumiCLQPvqKzJBMFxWA/metadata.json",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for Solvency ${SOLVENCY_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(SOLVENCY_TOKEN_ADDRESS, '420')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "Type",
            "value": "Worms",
          },
          Object {
            "trait_type": "Textures",
            "value": "Random",
          },
          Object {
            "trait_type": "Direction",
            "value": "Up",
          },
          Object {
            "trait_type": "Look",
            "value": "Pixelated",
          },
        ],
        "contentURL": "https://solvency.s3.amazonaws.com/420-1619139823837.mp4",
        "contentURLMimeType": "video/mp4",
        "description": "Solvency by Ezra Miller. Visit https://solvency.art/view/420 to view the real-time artwork.",
        "externalURL": "https://solvency.art/view/420",
        "imageURL": "https://solvency.s3.amazonaws.com/420-1619139823837.jpg",
        "imageURLMimeType": "image/jpeg",
        "metadata": Object {
          "animation_url": "https://solvency.s3.amazonaws.com/420-1619139823837.mp4",
          "attributes": Array [
            Object {
              "trait_type": "Type",
              "value": "Worms",
            },
            Object {
              "trait_type": "Textures",
              "value": "Random",
            },
            Object {
              "trait_type": "Direction",
              "value": "Up",
            },
            Object {
              "trait_type": "Look",
              "value": "Pixelated",
            },
          ],
          "background_color": "FFFFFF",
          "description": "Solvency by Ezra Miller. Visit https://solvency.art/view/420 to view the real-time artwork.",
          "external_url": "https://solvency.art/view/420",
          "image": "https://solvency.s3.amazonaws.com/420-1619139823837.jpg",
          "name": "Solvency #420",
        },
        "name": "Solvency #420",
        "tokenAddress": "0x82262bFba3E25816b4C720F1070A71C7c16A8fc4",
        "tokenId": "420",
        "tokenURI": "https://solvency.art/api/420",
        "tokenURL": "https://solvency.art/api/420",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for SuperRare ${SUPERRARE_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(SUPERRARE_TOKEN_ADDRESS, '29061')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "contentURL": "https://ipfs.pixura.io/ipfs/QmUrFzAXbJBvqdmQ9hqN7SMPuqWfW7qefithk4weTdzrT6/ACS_shaman.png",
        "contentURLMimeType": "image/png",
        "description": "The gatekeeper represents both Guardian and Gate. Now, whatever could be hiding behind a gate capable of eating anyone who tries to open it ? ",
        "imageURL": "https://gateway.ipfs.io/ipfs/QmUrFzAXbJBvqdmQ9hqN7SMPuqWfW7qefithk4weTdzrT6/ACS_shaman.png",
        "imageURLMimeType": "image/png",
        "metadata": Object {
          "createdBy": "pbock",
          "description": "The gatekeeper represents both Guardian and Gate. Now, whatever could be hiding behind a gate capable of eating anyone who tries to open it ? ",
          "image": "https://ipfs.pixura.io/ipfs/QmUrFzAXbJBvqdmQ9hqN7SMPuqWfW7qefithk4weTdzrT6/ACS_shaman.png",
          "media": Object {
            "dimensions": "5000x5255",
            "mimeType": "image/png",
            "size": "2401820",
            "uri": "https://ipfs.pixura.io/ipfs/QmUrFzAXbJBvqdmQ9hqN7SMPuqWfW7qefithk4weTdzrT6/ACS_shaman.png",
          },
          "name": "Requiem of the Gatekeeper",
          "tags": Array [
            "gatekeeper",
            "abstract",
          ],
          "yearCreated": "2021",
        },
        "name": "Requiem of the Gatekeeper",
        "tokenAddress": "0xb932a70A57673d89f4acfFBE830E8ed7f75Fb9e0",
        "tokenId": "29061",
        "tokenURI": "https://ipfs.pixura.io/ipfs/QmdL1WzygHFE8r4g2Gp6PfLu8xKYDJcjQzCbnSPcQAAEt6/metadata.json",
        "tokenURL": "https://gateway.ipfs.io/ipfs/QmdL1WzygHFE8r4g2Gp6PfLu8xKYDJcjQzCbnSPcQAAEt6/metadata.json",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for BlockParty ${BLOCKPARY_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(BLOCKPARY_TOKEN_ADDRESS, '1290')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "Creator",
            "value": "SHL0MS",
          },
        ],
        "contentURL": "https://gateway.ipfs.io/ipfs/QmWdFtZyrSKxGMeMuhWyi5bCUoNR8hgpWwoVKdJQsftipQ?0059_final_edit.mp4",
        "contentURLMimeType": "video/mp4",
        "externalURL": "https://blockparty.co",
        "imageURL": "https://gateway.ipfs.io/ipfs/QmP3HjvRhwLhrcUSedcSLiiu6f23zbQSTTiYFxRMbBBRcc",
        "imageURLMimeType": "image/png",
        "metadata": Object {
          "animation_url": "https://gateway.ipfs.io/ipfs/QmWdFtZyrSKxGMeMuhWyi5bCUoNR8hgpWwoVKdJQsftipQ?0059_final_edit.mp4",
          "attributes": Array [
            Object {
              "trait_type": "Creator",
              "value": "SHL0MS",
            },
          ],
          "external_url": "https://blockparty.co",
          "image": "https://gateway.ipfs.io/ipfs/QmP3HjvRhwLhrcUSedcSLiiu6f23zbQSTTiYFxRMbBBRcc",
          "logo": "https://gateway.ipfs.io/ipfs/QmP3HjvRhwLhrcUSedcSLiiu6f23zbQSTTiYFxRMbBBRcc",
          "name": "FNTN // 59",
        },
        "name": "FNTN // 59",
        "tokenAddress": "0x2Fb704d243cFA179fFaD4D87AcB1D36bcf243a44",
        "tokenId": "1290",
        "tokenURI": "https://gateway.ipfs.io/ipfs/QmbYNDhcPxvHxNwrxGJJbgQ2HPb5E2yjkTftWgiZzvuDbp",
        "tokenURL": "https://gateway.ipfs.io/ipfs/QmbYNDhcPxvHxNwrxGJJbgQ2HPb5E2yjkTftWgiZzvuDbp",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for Mannys Game ${MANNYS_GAME_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(MANNYS_GAME_TOKEN_ADDRESS, '1290')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "skin",
            "value": "Base Common",
          },
          Object {
            "trait_type": "mood",
            "value": "agony",
          },
        ],
        "contentURL": "https://mannys-game-viewer.herokuapp.com/view/1290",
        "contentURLMimeType": "text/html; charset=UTF-8",
        "description": "The most common Manny type. Not needed to win the game, but may be useful later. Visit https://mannys.game/1290 to interact with your Manny.",
        "externalURL": "https://mannys.game/1290",
        "imageURL": "https://gateway.ipfs.io/ipfs/Qmf5ZxJ3jNX9egrwUmWRQWKgRqL62AJXfCTjHVG8KFRgWh",
        "imageURLMimeType": "image/png",
        "metadata": Object {
          "animation_url": "https://mannys-game-viewer.herokuapp.com/view/1290",
          "attributes": Array [
            Object {
              "trait_type": "skin",
              "value": "Base Common",
            },
            Object {
              "trait_type": "mood",
              "value": "agony",
            },
          ],
          "avatar_url": "ipfs://QmdZP1ESkVTGzUsph4kEqvBF3jr3vGuoXetQUq8J49kyDb",
          "description": "The most common Manny type. Not needed to win the game, but may be useful later. Visit https://mannys.game/1290 to interact with your Manny.",
          "external_url": "https://mannys.game/1290",
          "iframe_url": "https://mannys-game-viewer.herokuapp.com/view/1290",
          "image": "ipfs://Qmf5ZxJ3jNX9egrwUmWRQWKgRqL62AJXfCTjHVG8KFRgWh",
          "name": "Manny #1290",
          "texture_url": "ipfs://QmP3RMUph4cEsgBqTGgr7EfnMSSWztVcA42yY1hGSNhT9d",
          "token_id": 1290,
        },
        "name": "Manny #1290",
        "tokenAddress": "0x2bd58A19C7E4AbF17638c5eE6fA96EE5EB53aed9",
        "tokenId": "1290",
        "tokenURI": "ipfs://QmPwTutrh6ahPUwPgkygbTSDuMzmR3gJSpsaBBo8UjQkLo/1290",
        "tokenURL": "https://gateway.ipfs.io/ipfs/QmPwTutrh6ahPUwPgkygbTSDuMzmR3gJSpsaBBo8UjQkLo/1290",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for Algolite ${ALGOLITE_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(ALGOLITE_TOKEN_ADDRESS, '856')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "center object",
            "value": "pup",
          },
          Object {
            "trait_type": "left object",
            "value": "weed",
          },
          Object {
            "trait_type": "right object",
            "value": "jarrito",
          },
          Object {
            "trait_type": "mirror object",
            "value": "boxer",
          },
        ],
        "contentURL": "https://ytb2lxrcxes562ouis445edr2qa2h3t7s7bwirtjrekkiwlr32rq.arweave.net/xMOl3iK5Jd9p1ES5zpBx1AGj7n-Xw2RGaYkUpFlx3qM/index.html?mirror=boxer&center=pup&right=jarrito&left=weed",
        "contentURLMimeType": "text/html; charset=utf-8",
        "description": "Llego con las manos llenas, aqui te ofrezco halgo light.",
        "imageURL": "https://bijm75ajnf2py2a25uz2vmqziujorhpck7kfk72ipynl4fgv72aa.arweave.net/ChLP9AlpdPxoGu0zqrIZRRLoneJX1FV_SH4avhTV_oA/856.png",
        "imageURLMimeType": "image/png",
        "metadata": Object {
          "animation_url": "https://ytb2lxrcxes562ouis445edr2qa2h3t7s7bwirtjrekkiwlr32rq.arweave.net/xMOl3iK5Jd9p1ES5zpBx1AGj7n-Xw2RGaYkUpFlx3qM/index.html?mirror=boxer&center=pup&right=jarrito&left=weed",
          "description": "Llego con las manos llenas, aqui te ofrezco halgo light.",
          "image": "https://bijm75ajnf2py2a25uz2vmqziujorhpck7kfk72ipynl4fgv72aa.arweave.net/ChLP9AlpdPxoGu0zqrIZRRLoneJX1FV_SH4avhTV_oA/856.png",
          "name": "Soy yo, Pup. — Guerrere valiente. — Weed y Jarrito — No tienen iguales. — Escúchame. Amame. Intercambiame. — Boxer",
          "properties": Object {
            "center object": "pup",
            "left object": "weed",
            "mirror object": "boxer",
            "right object": "jarrito",
          },
        },
        "name": "Soy yo, Pup. — Guerrere valiente. — Weed y Jarrito — No tienen iguales. — Escúchame. Amame. Intercambiame. — Boxer",
        "tokenAddress": "0x5c685a3EBC751F36B2123C25F5c464D3b9964AfC",
        "tokenId": "856",
        "tokenURI": "https://buo7dhteahrnurg7h3oysx3ldezloaopronrtnyssqfbvqsamqfa.arweave.net/DR3xnmQB4tpE3z7diV9rGTK3Ac-Lmxm3EpQKGsJAZAo/856.json",
        "tokenURL": "https://buo7dhteahrnurg7h3oysx3ldezloaopronrtnyssqfbvqsamqfa.arweave.net/DR3xnmQB4tpE3z7diV9rGTK3Ac-Lmxm3EpQKGsJAZAo/856.json",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for Humanoids ${HUMANOID_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(HUMANOID_TOKEN_ADDRESS, '368')
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "Background",
            "value": "Grey",
          },
          Object {
            "trait_type": "Type",
            "value": "Human",
          },
          Object {
            "trait_type": "Body",
            "value": "Light Green",
          },
          Object {
            "trait_type": "Face",
            "value": "Sticker ETH",
          },
          Object {
            "trait_type": "Eyes",
            "value": "Heart Glasses",
          },
          Object {
            "trait_type": "Head",
            "value": "Halo",
          },
          Object {
            "trait_type": "Neck",
            "value": "Bow Tie",
          },
        ],
        "contentURL": "https://thehumanoids.co/api/img/368.jpg",
        "contentURLMimeType": "image/jpeg",
        "externalURL": "https://thehumanoids.co",
        "imageURL": "https://thehumanoids.co/api/img/368.jpg",
        "imageURLMimeType": "image/jpeg",
        "metadata": Object {
          "attributes": Array [
            Object {
              "trait_type": "Background",
              "value": "Grey",
            },
            Object {
              "trait_type": "Type",
              "value": "Human",
            },
            Object {
              "trait_type": "Body",
              "value": "Light Green",
            },
            Object {
              "trait_type": "Face",
              "value": "Sticker ETH",
            },
            Object {
              "trait_type": "Eyes",
              "value": "Heart Glasses",
            },
            Object {
              "trait_type": "Head",
              "value": "Halo",
            },
            Object {
              "trait_type": "Neck",
              "value": "Bow Tie",
            },
          ],
          "external_url": "https://thehumanoids.co",
          "image_url": "https://thehumanoids.co/api/img/368.jpg",
          "name": "Humanoid #368",
          "tokenId": "368",
        },
        "name": "Humanoid #368",
        "tokenAddress": "0x3a5051566b2241285BE871f650C445A88A970edd",
        "tokenId": "368",
        "tokenURI": "https://raw.githubusercontent.com/TheHumanoids/metadata/main/368",
        "tokenURL": "https://raw.githubusercontent.com/TheHumanoids/metadata/main/368",
        "tokenURLMimeType": "application/json",
      }
    `)
  })

  it(`should be able to fetch and parse metadata for CyberKorgz VX ${CYBERKORGZ_VX_TOKEN_ADDRESS}`, async () => {
    const resp = await parser.fetchMetadata(
      CYBERKORGZ_VX_TOKEN_ADDRESS,
      '12152',
    )
    expect(resp).toMatchInlineSnapshot(`
      Object {
        "attributes": Array [
          Object {
            "trait_type": "Head Accessory",
            "value": "Gold Earring",
          },
          Object {
            "trait_type": "Body Accessory",
            "value": "KJJ White Belt",
          },
          Object {
            "trait_type": "Hat",
            "value": "CK Cap",
          },
        ],
        "contentURL": "https://vxviewer.vercel.app/12152",
        "contentURLMimeType": "text/html; charset=utf-8",
        "externalURL": "https://www.cyberkongz.com/kong-vx/12152",
        "imageURL": "https://cyberkongz.fra1.cdn.digitaloceanspaces.com/public/12152/12152_preview.jpg",
        "imageURLMimeType": "image/jpeg",
        "metadata": Object {
          "animation_url": "https://vxviewer.vercel.app/12152",
          "attributes": Array [
            Object {
              "trait_type": "Head Accessory",
              "value": "Gold Earring",
            },
            Object {
              "trait_type": "Body Accessory",
              "value": "KJJ White Belt",
            },
            Object {
              "trait_type": "Hat",
              "value": "CK Cap",
            },
          ],
          "external_url": "https://www.cyberkongz.com/kong-vx/12152",
          "iframe_url": "https://vxviewer.vercel.app/12152",
          "image": "https://cyberkongz.fra1.cdn.digitaloceanspaces.com/public/12152/12152_preview.jpg",
          "name": "CyberKong VX #12152",
        },
        "name": "CyberKong VX #12152",
        "tokenAddress": "0x7EA3Cca10668B8346aeC0bf1844A49e995527c8B",
        "tokenId": "12152",
        "tokenURI": "http://kongz.herokuapp.com/api/metadata-vx/12152",
        "tokenURL": "http://kongz.herokuapp.com/api/metadata-vx/12152",
        "tokenURLMimeType": "application/json",
      }
    `)
  })
})
