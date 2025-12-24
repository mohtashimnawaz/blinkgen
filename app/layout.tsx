import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'BlinkGen',
  description: 'Generate social Blinks for SOL donations and tickets',
}

export const metadata = {
  title: 'BlinkGen',
  description: 'Create shareable on-chain Blinks for donations & tickets',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts & compiled Tailwind CSS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="stylesheet" href="/tailwind.css" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className="antialiased" style={{ fontFamily: `Inter, ui-sans-serif, system-ui, -apple-system` }}>
        <main className="min-h-screen p-8 bg-slate-50">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </body>
    </html>
  )
}
