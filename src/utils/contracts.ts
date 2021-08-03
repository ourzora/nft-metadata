import { JsonRpcProvider } from '@ethersproject/providers'
import { Erc721, Erc721Factory } from '@zoralabs/core/dist/typechain'
import { AddressZero } from '@ethersproject/constants'
import { MAKERSPLACE_TOKEN_ADDRESS } from '../constants'

type SupportedContractResponse = {
  erc721: boolean
  erc721Metadata?: boolean
  erc721Enumerable?: boolean
}

// TODO - do this for all known and tested contracts
const registeredContracts: {
  [key: string]: SupportedContractResponse
} = {
  [MAKERSPLACE_TOKEN_ADDRESS]: {
    erc721: true,
    erc721Metadata: true,
    erc721Enumerable: true,
  },
}

export async function getSupportedInterfaces(
  provider: JsonRpcProvider,
  tokenAddress: string,
): Promise<SupportedContractResponse> {
  if (registeredContracts?.[tokenAddress]) {
    return registeredContracts[tokenAddress]
  }

  try {
    const Contract = Erc721Factory.connect(tokenAddress, provider)
    const ERC721Interface = '0x80ac58cd'
    const ERC721MetadataInterface = '0x5b5e139f'
    const ERC721EnumerableInterface = '0x780e9d63'
    const [erc721, erc721Metadata, erc721Enumerable] = await Promise.all([
      Contract.supportsInterface(ERC721Interface),
      Contract.supportsInterface(ERC721MetadataInterface),
      Contract.supportsInterface(ERC721EnumerableInterface),
    ])
    return {
      erc721,
      erc721Metadata,
      erc721Enumerable,
    }
  } catch (e) {
    // TODO - add stub registry for contracts and their supported functions
    // we just attempt all if we can't make supports interface calls
    return {
      erc721: true,
      erc721Metadata: true,
      erc721Enumerable: true,
    }
  }
}

export async function fetchOwnerOf(
  contract: Erc721,
  tokenId: string,
  canCatch = false,
) {
  try {
    const ownerAddress = await contract.ownerOf(tokenId)
    return ownerAddress
  } catch (e) {
    if (!canCatch) {
      throw e
    }
    const totalSupply = await contract.totalSupply()
    if (
      totalSupply.gte(tokenId) &&
      e.reason === 'ERC721: owner query for nonexistent token'
    ) {
      return AddressZero
    }
    throw e
  }
}
