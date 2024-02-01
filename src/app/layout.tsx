import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import RecoilRootProvider from '@/components/RecoilRootProvider'
import DesignLayout from '../components/DesignLayout'
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
        <RecoilRootProvider >
          <Navbar />
          <DesignLayout>
            {children}
          </DesignLayout>
        </RecoilRootProvider>
        </body>
    </html>
  )
}
