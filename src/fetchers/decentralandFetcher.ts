import { Erc721Factory } from '@zoralabs/core/dist/typechain'
import { JsonRpcProvider } from '@ethersproject/providers'

const DECENTRALAND_API_BASE_URL = 'https://api.decentraland.org/v2'

export async function fetchDecentralandContractData(
  provider: JsonRpcProvider,
  contractAddress: string,
  tokenId: string,
) {
  const erc721Contract = Erc721Factory.connect(contractAddress, provider)
  const ownerAddress = await erc721Contract.ownerOf(tokenId)
  return {
    tokenURI: `${DECENTRALAND_API_BASE_URL}/contracts/${contractAddress.toLowerCase()}/tokens/${tokenId}`,
    ownerAddress,
  }
}
