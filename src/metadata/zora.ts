import { JsonRpcProvider } from '@ethersproject/providers'
import { MediaFactory } from '@zoralabs/core/dist/typechain'

export async function fetchZoraMeta(
  tokenAddress: string,
  tokenId: string,
  provider: JsonRpcProvider,
) {
  const contentURL = await MediaFactory.connect(
    tokenAddress,
    provider,
  ).tokenURI(tokenId)
  return {
    contentURL,
  }
}
