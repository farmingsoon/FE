import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FarmingSoon',
  description: 'secondHand Merchan selling by Auction',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="flex flex-row">
        <Navbar />
        <main className="flex-1 py-8 px-5 h-screen overflow-y-auto">
        {children}
        </main>
        </body>
    </html>
  )
}
