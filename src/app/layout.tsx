import type { Metadata } from 'next'
import './globals.css'
import RecoilRootProvider from '@/components/RecoilRootProvider'
import DesignLayout from '../components/DesignLayout'
import Navbar from '@/components/Navbar'
import Script from 'next/script'


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
            <Script 
              id="kakaoOauth-script"
              src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.0/kakao.min.js" 
              integrity="sha384-l+xbElFSnPZ2rOaPrU//2FF5B4LB8FiX5q4fXYTlfcG4PGpMkE1vcL7kNXI6Cci0" 
              crossOrigin="anonymous">
            </Script>
            {children}
          </DesignLayout>
        </RecoilRootProvider>
        </body>
    </html>
  )
}
