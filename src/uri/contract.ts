import { ZORA_TOKEN_ADDRESS } from '../constants/addresses'
import { MediaFactory } from '@zoralabs/core/dist/typechain'
import { JsonRpcProvider } from '@ethersproject/providers'
import { isAddressMatch } from 'src/utils/addresses'

export function getAlternateContractCall(
  networkName: string,
  tokenAddress: string,
  tokenId: string,
  provider: JsonRpcProvider,
) {
  if (isAddressMatch(networkName, tokenAddress, ZORA_TOKEN_ADDRESS)) {
      return MediaFactory.connect(tokenAddress, provider).tokenMetadataURI(
        tokenId,
      )
  }
}
