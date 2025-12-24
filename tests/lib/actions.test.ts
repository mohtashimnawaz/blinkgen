import { describe, it, expect, vi } from 'vitest'
import { Keypair } from '@solana/web3.js'

// Mock getConnection to avoid network calls
vi.mock('../../lib/solana', () => ({
  getConnection: () => ({
    getLatestBlockhash: async () => ({ blockhash: 'TEST_BLOCKHASH', lastValidBlockHeight: 0 }),
  }),
  LAMPORTS_PER_SOL: 1000000000,
}))

import { buildTransferTransaction } from '../../lib/actions'

describe('buildTransferTransaction', () => {
  it('returns base64 and blockhash', async () => {
    const fromKeypair = Keypair.generate()
    const toKeypair = Keypair.generate()

    const from = fromKeypair.publicKey.toBase58()
    const to = toKeypair.publicKey.toBase58()

    const { base64, recentBlockhash } = await buildTransferTransaction({ from, to, lamports: 1 })
    expect(typeof base64).toBe('string')
    expect(recentBlockhash).toBe('TEST_BLOCKHASH')
  })
})
