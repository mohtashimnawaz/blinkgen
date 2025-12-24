'use client'

import { useState } from 'react'

export default function DonateForm() {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [label, setLabel] = useState('Donate')
  const [title, setTitle] = useState('')
  const [icon, setIcon] = useState('')

  return (
    <form className="p-4 bg-white rounded-md shadow-sm space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">Wallet address</label>
        <input value={to} onChange={(e) => setTo(e.target.value)} className="mt-1 w-full rounded-md border p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Amount (SOL)</label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 w-full rounded-md border p-2" />
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

      <div className="pt-2">
        <button type="button" className="px-4 py-2 rounded-md bg-emerald-600 text-white">Generate URL</button>
      </div>
    </form>
  )
}
