'use client'

import { useEffect, useState } from 'react'

export default function PreviewCard({ url }: { url?: string | null }) {
  const [meta, setMeta] = useState<{ title?: string; label?: string; icon?: string } | null>(null)

  useEffect(() => {
    setMeta(null)
    if (!url) return
    // auto-fetch metadata when URL changes
    fetch(url)
      .then((res) => (res.ok ? res.json() : Promise.reject('Bad response')))
      .then((data) => setMeta({ title: data.title, label: data.label, icon: data.icon }))
      .catch(() => setMeta(null))
  }, [url])

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      {!url && (
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-slate-100 rounded-md" />
          <div>
            <h3 className="text-lg font-semibold">Preview</h3>
            <p className="text-slate-600">URL preview and CTA will appear here when you fill the form.</p>
          </div>
        </div>
      )}

      {url && (
        <div>
          <div className="flex items-center gap-4">
            {meta?.icon ? <img src={meta.icon} className="w-16 h-16 rounded-md" alt="icon" /> : <div className="w-16 h-16 bg-slate-100 rounded-md" />}
            <div>
              <h3 className="text-lg font-semibold">{meta?.title ?? 'Loading preview...'}</h3>
              <p className="text-slate-600">{meta?.label ?? 'Fetching metadata...'}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={() => url && fetch(url).then((r) => r.json()).then((d) => setMeta({ title: d.title, label: d.label, icon: d.icon }))} className="px-3 py-1 rounded-md bg-sky-600 text-white">Refresh</button>
            <a href={url} target="_blank" rel="noreferrer" className="ml-2 px-3 py-1 rounded-md bg-slate-100">Open</a>
          </div>
        </div>
      )}
    </div>
  )
}
