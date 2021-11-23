import { getAddress } from '@ethersproject/address'
import { ethers, utils } from 'ethers'

export function isAddressMatch(chainName: string, a: string, b: any) {
  return getAddress(a) === getAddress(b[chainName])
}

export function normalizeTokenID1155(tokenId: string) {
  return utils
    .hexlify(
      utils.zeroPad(
        utils.arrayify(ethers.BigNumber.from(tokenId).toHexString()),
        64,
      ),
    )
    .substr(4)
}
