'use client'
import localFont from "next/font/local";
import "@/app/globals.css";
import Providers from '@/providers/Providers'
import { Toaster } from 'sonner';
import GoogleTranslate from '@/components/common/translate/GoogleTranslate';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="h-full">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://www.gstatic.com/_/translate_http/_/ss/k=translate_http.tr.26tY-h6gH9w.L.W.O/am=CAM/d=0/rs=AN8SPfpIXxhebB2A47D9J-MACsXmFF6Vew/m=el_main_css"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans h-full bg-black-50`}>
        
        <Providers>
          {children}
          <Toaster 
            position="top-right"
            expand={false}
            richColors
            closeButton
          />
          <GoogleTranslate />
        </Providers>
      </body>
    </html>
  )
}
