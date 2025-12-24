import { Connection } from '@solana/web3.js'

export const LAMPORTS_PER_SOL = 1_000_000_000

export function getConnection(cluster: string = 'mainnet-beta') {
  const endpoints: Record<string, string> = {
    'mainnet-beta': 'https://api.mainnet-beta.solana.com',
    devnet: 'https://api.devnet.solana.com',
    testnet: 'https://api.testnet.solana.com',
  }
  const endpoint = endpoints[cluster] ?? endpoints['mainnet-beta']
  return new Connection(endpoint, 'confirmed')
}
