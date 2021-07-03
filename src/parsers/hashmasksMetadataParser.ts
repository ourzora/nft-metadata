import { JsonRpcProvider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { parseGenericMetadata } from './openseaMetadataParser'

export async function parseHashmasksMetadata(
  provider: JsonRpcProvider,
  ipfsBaseURL: string,
  contractAddress: string,
  tokenId: string,
  tokenURI: string,
) {
  const baseMeta = await parseGenericMetadata(
    provider,
    ipfsBaseURL,
    contractAddress,
    tokenId,
    tokenURI,
  )

  const HMContract = new Contract(
    contractAddress,
    [
      'function tokenNameByIndex(uint256 index) public view returns (string memory)',
    ],
    provider,
  )

  const name = await HMContract.tokenNameByIndex(tokenId)

  return {
    name,
    ...baseMeta,
  }
}
