import { Contract } from '@ethersproject/contracts'
import { ParserConfig } from './index'

export async function parseHashmasksMetadata(config: ParserConfig) {
  const { provider, contractData } = config
  const { tokenAddress, tokenId } = contractData

  const HMContract = new Contract(
    tokenAddress,
    [
      'function tokenNameByIndex(uint256 index) public view returns (string memory)',
    ],
    provider,
  )

  const name = await HMContract.tokenNameByIndex(tokenId)

  return {
    name,
  }
}
