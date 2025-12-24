import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LAMPORTS_PER_SOL, getConnection } from '../../../../lib/solana'
import { isValidPubkey, parseSolToLamports } from '../../../../utils/validators'
import { buildTransferTransaction } from '../../../../lib/actions'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const to = url.searchParams.get('to')
  const amount = url.searchParams.get('amount')
  const title = url.searchParams.get('title') ?? 'Donate'
  const icon = url.searchParams.get('icon') ?? ''
  const label = url.searchParams.get('label') ?? 'Donate'
  const network = url.searchParams.get('network') ?? 'devnet'

  if (!to || !amount) {
    return new NextResponse(JSON.stringify({ error: 'Missing `to` or `amount` query params' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    })
  }

  if (!isValidPubkey(to)) {
    return new NextResponse(JSON.stringify({ error: 'Invalid `to` pubkey' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    })
  }

  const lamports = parseSolToLamports(amount)
  if (lamports === null) {
    return new NextResponse(JSON.stringify({ error: 'Invalid `amount`' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    })
  }

  // Minimal ActionGetResponse shape for Blink Inspector
  const response = {
    title: `${title} — ${label}`,
    icon,
    label: `${label} ${amount} SOL`,
    description: `Send ${amount} SOL to ${to}`,
    // action POST url (inspector will call this)
    actions: [
      { type: 'post', label, url: request.url }
    ],
    network,
  }

  return new NextResponse(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  })
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url)
  const to = url.searchParams.get('to')
  const amount = url.searchParams.get('amount')
  const network = url.searchParams.get('network') ?? 'devnet'

  if (!to || !amount) {
    return new NextResponse(JSON.stringify({ error: 'Missing `to` or `amount` query params' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    })
  }

  if (!isValidPubkey(to)) {
    return new NextResponse(JSON.stringify({ error: 'Invalid `to` pubkey' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    })
  }

  const lamports = parseSolToLamports(amount)
  if (lamports === null) {
    return new NextResponse(JSON.stringify({ error: 'Invalid `amount`' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    })
  }

  // parse body
  let body: any
  try {
    body = await request.json()
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    })
  }

  const accountKey = body?.account?.key
  if (!accountKey || typeof accountKey !== 'string') {
    return new NextResponse(JSON.stringify({ error: 'Missing account.key in body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    })
  }

  if (!isValidPubkey(accountKey)) {
    return new NextResponse(JSON.stringify({ error: 'Invalid account.key' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    })
  }

  try {
    const { base64 } = await buildTransferTransaction({ from: accountKey, to, lamports, network })

    const response = {
      serializedTransaction: base64,
      // optional: helpful metadata
      network,
      to,
      amount
    }

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    })
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ error: 'Failed to build transaction', details: String(err?.message ?? err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    })
  }
}
