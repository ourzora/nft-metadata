import { ZORA_RINKEBY_TOKEN_ADDRESS, ZORA_TOKEN_ADDRESS } from '../constants/addresses'
import { MediaFactory } from '@zoralabs/core/dist/typechain'
import { JsonRpcProvider } from '@ethersproject/providers'

export function getAlternateContractCall(
  tokenAddress: string,
  tokenId: string,
  provider: JsonRpcProvider,
) {
  switch (tokenAddress) {
    case ZORA_TOKEN_ADDRESS:
    case ZORA_RINKEBY_TOKEN_ADDRESS:
      return MediaFactory.connect(tokenAddress, provider).tokenMetadataURI(
        tokenId,
      )
    default:
      return
  }
}
