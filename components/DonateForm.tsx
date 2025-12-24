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
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  const validationError = useMemo(() => {
    if (!to) return 'Recipient wallet is required'
    if (!isValidPubkey(to)) return 'Invalid wallet address'
    const n = Number(amount)
    if (!amount || Number.isNaN(n) || n <= 0) return 'Amount must be a positive number'
    return null
  }, [to, amount])

  function buildUrl() {
    const base = `${typeof window !== 'undefined' ? window.location.origin : ''}/api/actions/donate`
    const params = new URLSearchParams()
    params.set('to', to)
    params.set('amount', amount)
    if (label) params.set('label', label)
    if (title) params.set('title', title)
    if (icon) params.set('icon', icon)
    params.set('network', 'devnet')
    return `${base}?${params.toString()}`
  }

  function handleGenerate() {
    setInfo(null)
    setLocalError(null)
    if (validationError) {
      setLocalError(validationError)
      setGeneratedUrl(null)
      if (onChange) onChange(null)
      return
    }
    const url = buildUrl()
    setGeneratedUrl(url)
    if (onChange) onChange(url)
    setInfo('URL generated — you can copy or open it')
  }

  // Clear info when inputs change
  function onInputChange(setter: (v: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value)
      setInfo(null)
      setLocalError(null)
    }
  }

  return (
    <form className="p-4 bg-white rounded-md shadow-sm space-y-4" onSubmit={(e) => e.preventDefault()} aria-label="Generate Blink form">
      <div>
        <label className="block text-sm font-medium text-slate-700">Wallet address</label>
        <input value={to} onChange={onInputChange(setTo)} className="mt-1 w-full rounded-md border p-2" placeholder="Recipient Pubkey" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Amount (SOL)</label>
        <input value={amount} onChange={onInputChange(setAmount)} className="mt-1 w-full rounded-md border p-2" placeholder="0.1" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Label (CTA)</label>
        <input value={label} onChange={onInputChange(setLabel)} className="mt-1 w-full rounded-md border p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Title</label>
        <input value={title} onChange={onInputChange(setTitle)} className="mt-1 w-full rounded-md border p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Icon URL</label>
        <input value={icon} onChange={onInputChange(setIcon)} className="mt-1 w-full rounded-md border p-2" />
      </div>

      <div className="pt-2 flex items-center gap-2">
        <button type="button" onClick={handleGenerate} className="px-4 py-2 rounded-md bg-emerald-600 text-white disabled:opacity-50">Generate URL</button>
        {generatedUrl && <CopyButton text={generatedUrl} onCopied={() => setInfo('Copied to clipboard')} />}
      </div>

      {localError && <p className="text-red-600 text-sm">{localError}</p>}
      {info && <p className="text-emerald-700 text-sm">{info}</p>}

      {generatedUrl && (
        <div className="mt-3 text-sm break-all text-slate-700">
          <strong className="mr-2">Generated URL:</strong>
          <div className="mt-1 flex items-start gap-2">
            <a className="text-sky-600 underline" href={generatedUrl} target="_blank" rel="noreferrer">{generatedUrl}</a>
            <CopyButton text={generatedUrl} onCopied={() => setInfo('Copied to clipboard')} />
          </div>
        </div>
      )}
    </form>
  )
}
