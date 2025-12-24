'use client'

import { useState } from 'react'

export default function CopyButton({ text, onCopied }: { text: string; onCopied?: () => void }) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback for older browsers: use a temporary textarea
        const ta = document.createElement('textarea')
        ta.value = text
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }

      setCopied(true)
      onCopied?.()
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed', err)
      // still try fallback
      try {
        const ta = document.createElement('textarea')
        ta.value = text
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        setCopied(true)
        onCopied?.()
        setTimeout(() => setCopied(false), 2000)
      } catch (err2) {
        console.error('Fallback copy failed', err2)
      }
    }
  }

  return (
    <button onClick={onCopy} className="px-3 py-1 rounded-md bg-slate-800 text-white text-sm" aria-live="polite">
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
