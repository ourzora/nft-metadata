import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { PUNKS_DATA_CONTRACT } from '../constants'

export async function fetchPunkAttributes(
  _: string,
  tokenId: string,
  provider: JsonRpcProvider,
) {
  const PunksDataContract = new Contract(
    PUNKS_DATA_CONTRACT,
    [
      'function punkAttributes(uint16 index) public view returns (string memory)',
      'function punkImageSvg(uint16 index) public view returns (string memory)',
    ],
    provider,
  )
  const [type, ...accessories] = (
    await PunksDataContract.punkAttributes(tokenId)
  ).split(',')
  const image = await PunksDataContract.punkImageSvg(tokenId)

  return {
    image,
    attributes: [
      { trait_type: 'Type', value: type },
      ...accessories.map((accessory: string) => ({
        trait_type: 'Accessory',
        value: accessory,
      })),
    ],
  }
}
