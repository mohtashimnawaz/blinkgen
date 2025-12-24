import { PublicKey } from '@solana/web3.js'
import { LAMPORTS_PER_SOL } from '../lib/solana'

export function isValidPubkey(key: string): boolean {
  try {
    new PublicKey(key)
    return true
  } catch (err) {
    return false
  }
}

export function parseSolToLamports(sol: string): number | null {
  const n = Number(sol)
  if (Number.isNaN(n)) return null
  if (n <= 0) return null
  // Prevent absurdly large amounts
  if (n > 1_000_000) return null
  // Use rounding to avoid float small fractions
  const lamports = Math.round(n * LAMPORTS_PER_SOL)
  if (!Number.isSafeInteger(lamports)) return null
  return lamports
}
