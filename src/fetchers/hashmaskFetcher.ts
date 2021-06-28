import { Erc721Factory } from '@zoralabs/core/dist/typechain'
import { JsonRpcProvider } from '@ethersproject/providers'

const HASHMARKS_TOKEN_URI_BASE = 'https://hashmap.azurewebsites.net'

export async function fetchHashmasksContractData(
  provider: JsonRpcProvider,
  contractAddress: string,
  tokenId: string,
) {
  const erc721Contract = Erc721Factory.connect(contractAddress, provider)
  const ownerAddress = await erc721Contract.ownerOf(tokenId)
  return {
    tokenURI: `${HASHMARKS_TOKEN_URI_BASE}/getMask/${tokenId}`,
    ownerAddress,
  }
}
