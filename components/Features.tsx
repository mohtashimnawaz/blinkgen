'use client'

const features = [
  { title: 'Stateless & Fast', desc: 'Encode recipient, amount, and label in the URL for a serverless MVP.' },
  { title: 'Secure Transfers', desc: 'Creates unsigned transfer transactions that the wallet signs client-side.' },
  { title: 'Dev Friendly', desc: 'Simple API endpoints per the Solana Actions spec.' },
  { title: 'Deployable', desc: 'Works with Vercel for public HTTPS URLs and social inspectors.' },
]

export default function Features() {
  return (
    <section id="features" className="mt-10">
      <h2 className="text-2xl font-bold">Why BlinkGen?</h2>
      <p className="text-slate-600 mt-2">Everything you need to create sharable payment links for events and donations.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((f) => (
          <div key={f.title} className="p-4 bg-white rounded-md shadow-sm">
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-slate-600 mt-1 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
