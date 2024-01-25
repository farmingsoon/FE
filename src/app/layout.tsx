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
        <main className="w-full mt-8 px-5">
        {children}
        </main>
        </body>
    </html>
  )
}
