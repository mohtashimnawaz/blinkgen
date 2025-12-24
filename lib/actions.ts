import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { getConnection } from './solana'

export async function buildTransferTransaction({
  from, to, lamports, network = 'devnet'
}: {
  from: string
  to: string
  lamports: number
  network?: string
}) {
  const connection = getConnection(network)
  const fromKey = new PublicKey(from)
  const toKey = new PublicKey(to)

  const tx = new Transaction()
  tx.add(
    SystemProgram.transfer({ fromPubkey: fromKey, toPubkey: toKey, lamports })
  )

  tx.feePayer = fromKey

  // get latest blockhash
  const { blockhash } = await connection.getLatestBlockhash()
  tx.recentBlockhash = blockhash

  // Serialize unsigned transaction
  const serialized = tx.serialize({ requireAllSignatures: false })
  const base64 = Buffer.from(serialized).toString('base64')

  return { base64, recentBlockhash: blockhash }
}
