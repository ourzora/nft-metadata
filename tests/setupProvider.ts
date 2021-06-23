import { config as dotenv } from 'dotenv'
import { JsonRpcProvider } from '@ethersproject/providers'

dotenv({ path: '.env.test' })

const RPC_URL = process.env.RPC_URL || 'https://cloudflare-eth.com/'
if (!RPC_URL) {
  throw new Error('Missing RPC URL')
}

export const testProvider = new JsonRpcProvider(RPC_URL)
