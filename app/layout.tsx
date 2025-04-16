import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Topic Clustering Analysis',
  description: 'Advanced text analysis and topic clustering application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
