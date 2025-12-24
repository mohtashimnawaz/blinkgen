'use client'

export default function Footer() {
  return (
    <footer className="mt-12 py-8 border-t bg-transparent">
      <div className="max-w-4xl mx-auto text-sm text-slate-600 flex flex-col md:flex-row gap-3 justify-between items-center">
        <div>© {new Date().getFullYear()} BlinkGen — Built for demos & portfolios</div>
        <div className="flex gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sky-600">GitHub</a>
          <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-sky-600">Deploy</a>
        </div>
      </div>
    </footer>
  )
}
