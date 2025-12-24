'use client'

import { useMemo, useState } from 'react'
import CopyButton from './CopyButton'
import { isValidPubkey } from '../utils/validators'

export default function DonateForm({ onChange }: { onChange?: (url: string | null) => void }) {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [label, setLabel] = useState('Donate')
  const [title, setTitle] = useState('')
  const [icon, setIcon] = useState('')

  const error = useMemo(() => {
    if (!to) return 'Recipient wallet is required'
    if (!isValidPubkey(to)) return 'Invalid wallet address'
    const n = Number(amount)
    if (!amount || Number.isNaN(n) || n <= 0) return 'Amount must be a positive number'
    return null
  }, [to, amount])

  const generatedUrl = useMemo(() => {
    if (error) return null
    const base = `${typeof window !== 'undefined' ? window.location.origin : ''}/api/actions/donate`
    const params = new URLSearchParams()
    params.set('to', to)
    params.set('amount', amount)
    if (label) params.set('label', label)
    if (title) params.set('title', title)
    if (icon) params.set('icon', icon)
    // Use devnet by default for safe testing
    params.set('network', 'devnet')
    return `${base}?${params.toString()}`
  }, [to, amount, label, title, icon, error])

  // propagate to parent preview card (optional)
  if (onChange) onChange(generatedUrl)

  return (
    <form className="p-4 bg-white rounded-md shadow-sm space-y-4" onSubmit={(e) => e.preventDefault()} aria-label="Generate Blink form">
      <div>
        <label className="block text-sm font-medium text-slate-700">Wallet address</label>
        <input value={to} onChange={(e) => setTo(e.target.value)} className="mt-1 w-full rounded-md border p-2" placeholder="Recipient Pubkey" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Amount (SOL)</label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 w-full rounded-md border p-2" placeholder="0.1" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Label (CTA)</label>
        <input value={label} onChange={(e) => setLabel(e.target.value)} className="mt-1 w-full rounded-md border p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-md border p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Icon URL</label>
        <input value={icon} onChange={(e) => setIcon(e.target.value)} className="mt-1 w-full rounded-md border p-2" />
      </div>

      <div className="pt-2 flex items-center gap-2">
        <button type="button" disabled={!generatedUrl} className="px-4 py-2 rounded-md bg-emerald-600 text-white disabled:opacity-50">Generate URL</button>
        {generatedUrl && <CopyButton text={generatedUrl} />}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {generatedUrl && (
        <div className="mt-3 text-sm break-all text-slate-700">
          <strong className="mr-2">Generated URL:</strong>
          <div className="mt-1 flex items-start gap-2">
            <a className="text-sky-600 underline" href={generatedUrl} target="_blank" rel="noreferrer">{generatedUrl}</a>
            <CopyButton text={generatedUrl} />
          </div>
        </div>
      )}
    </form>
  )
}
