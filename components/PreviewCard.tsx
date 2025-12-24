import { useState } from 'react'

export default function PreviewCard({ url }: { url?: string | null }) {
  const [meta, setMeta] = useState<{ title?: string; label?: string; icon?: string } | null>(null)

  async function loadMeta(u: string) {
    try {
      const res = await fetch(u, { method: 'GET' })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      setMeta({ title: data.title, label: data.label, icon: data.icon })
    } catch (err) {
      setMeta(null)
    }
  }

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
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
              <h3 className="text-lg font-semibold">{meta?.title ?? 'Loading...'}</h3>
              <p className="text-slate-600">{meta?.label ?? 'Loading...'}</p>
            </div>
          </div>

          <div className="mt-4">
            <button onClick={() => url && loadMeta(url)} className="px-3 py-1 rounded-md bg-sky-600 text-white">Fetch Preview</button>
            <a href={url} target="_blank" rel="noreferrer" className="ml-2 px-3 py-1 rounded-md bg-slate-100">Open</a>
          </div>
        </div>
      )}
    </div>
  )
}
