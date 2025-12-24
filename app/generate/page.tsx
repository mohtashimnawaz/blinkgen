import { useState } from 'react'
import DonateForm from '../../components/DonateForm'
import PreviewCard from '../../components/PreviewCard'

export default function GeneratePage() {
  const [url, setUrl] = useState<string | null>(null)

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Create a Blink</h1>
      <p className="text-slate-600">Enter details below to generate a Blink URL.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DonateForm onChange={(u) => setUrl(u)} />
        <PreviewCard url={url} />
      </div>
    </section>
  )
}
