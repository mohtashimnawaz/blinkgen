'use client'

import { useState } from 'react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed', err)
    }
  }

  return (
    <button onClick={onCopy} className="px-3 py-1 rounded-md bg-slate-800 text-white text-sm">
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
