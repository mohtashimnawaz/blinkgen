import Link from 'next/link'
import Hero from '../components/Hero'
import Features from '../components/Features'

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />

      <main className="mt-6">
        <div className="max-w-4xl mx-auto">
          <Features />

          <hr className="my-8" />

          <h2 className="text-xl font-semibold">Developer notes</h2>
          <ul className="list-disc pl-5 text-slate-700 mt-2">
            <li>App Router + TypeScript + Tailwind scaffold</li>
            <li>Endpoints: <code>/api/actions/donate</code></li>
            <li>Generator UI: <Link href="/generate" className="text-sky-600 underline">Create a Blink</Link></li>
          </ul>
        </div>
      </main>
    </div>
  )
}
