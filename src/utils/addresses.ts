import { getAddress } from '@ethersproject/address'
import { ethers, utils } from 'ethers'

export function isAddressMatch(
  chainName: string,
  address: string,
  addressByNetwork: { [address: string]: string },
) {
  if (!addressByNetwork[chainName]) {
    return false
  }
  return getAddress(address) === getAddress(addressByNetwork[chainName])
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
