import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LAMPORTS_PER_SOL } from '../../../../lib/solana'

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

  if (!to || !amount) {
    return new NextResponse(JSON.stringify({ error: 'Missing `to` or `amount` query params' }), {
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
    actions: [
      { type: 'post', label, url: request.url }
    ]
  }

  return new NextResponse(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  })
}

export async function POST(request: NextRequest) {
  // For Phase 2 scaffold we return a placeholder; full implementation in Phase 3
  return new NextResponse(JSON.stringify({ message: 'Not implemented - POST will return a serialized transaction in Phase 3' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  })
}
