'use client'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-sky-600 to-emerald-500 text-white rounded-lg p-10 shadow-lg">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">BlinkGen — Share on-chain Blinks that collect SOL</h1>
          <p className="mt-4 text-sky-100">Generate shareable Blink URLs that unfurl in social feeds and let people donate or buy tickets directly from the post.</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/generate" className="inline-block bg-white text-sky-700 px-4 py-2 rounded-md font-semibold shadow hover:shadow-md transition">Create a Blink</a>
            <a href="#features" className="inline-block border border-white/30 px-4 py-2 rounded-md text-white hover:bg-white/10 transition">How it works</a>
          </div>

          <div className="mt-6 text-sm text-sky-100">Built with Next.js · Tailwind · @solana/web3.js</div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="w-72 h-72 bg-white/10 rounded-xl p-4 shadow-inner flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-semibold">Stateless Blink</div>
              <div className="mt-2 text-sm text-sky-100">URL contains destination + amount</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
