import { Contract } from '@ethersproject/contracts'
import { parseGenericMetadata } from './openseaMetadataParser'
import { ParserConfig } from './index'

export async function parseHashmasksMetadata(config: ParserConfig) {
  const baseMeta = await parseGenericMetadata(config)

  const { contractAddress, tokenId, provider } = config

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
