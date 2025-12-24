import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'BlinkGen',
  description: 'Generate social Blinks for SOL donations and tickets',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Link the compiled Tailwind CSS to ensure utilities are available */}
        <link rel="stylesheet" href="/tailwind.css" />
      </head>
      <body>
        <main className="min-h-screen p-8">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
      </body>
    </html>
  )
}
