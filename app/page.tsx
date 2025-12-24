import Link from 'next/link'

export default function Home() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">BlinkGen</h1>
      <p className="text-slate-600">Generate an on-chain Blink URL that supports donations & tickets.</p>

      <div className="pt-4">
        <Link href="/generate" className="px-4 py-2 bg-sky-600 text-white rounded-md">Create a Blink</Link>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold">Developer notes</h2>
      <ul className="list-disc pl-5 text-slate-700">
        <li>App Router + TypeScript + Tailwind scaffold</li>
        <li>API endpoint stub at <code>/api/actions/donate</code></li>
      </ul>
    </section>
  )
}
