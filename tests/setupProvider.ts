import { config as dotenv } from 'dotenv'
import { JsonRpcProvider } from '@ethersproject/providers'

dotenv({ path: '.env.test' })

const RPC_URL = process.env.RPC_URL || 'https://cloudflare-eth.com/'
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
if (!RPC_URL) {
  throw new Error('Missing RPC URL')
}

export const testProvider = new JsonRpcProvider(RPC_URL)
export const testRinkebyProvider = new JsonRpcProvider(RINKEBY_RPC_URL)
