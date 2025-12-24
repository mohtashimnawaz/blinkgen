import { describe, it, expect } from 'vitest'
import { isValidPubkey, parseSolToLamports } from '../../utils/validators'

describe('validators', () => {
  it('validates pubkeys correctly', () => {
    expect(isValidPubkey('11111111111111111111111111111111')).toBe(true) // valid base58
    expect(isValidPubkey('not-a-key')).toBe(false)
  })

  it('parses SOL to lamports', () => {
    expect(parseSolToLamports('0.1')).toBe(100000000)
    expect(parseSolToLamports('1')).toBe(1000000000)
    expect(parseSolToLamports('abc')).toBeNull()
    expect(parseSolToLamports('-1')).toBeNull()
  })
})
