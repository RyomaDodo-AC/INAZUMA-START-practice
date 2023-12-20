import './globals.css'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import { GoogleTagManagerHead, GoogleTagManagerBody } from '@/features/functions/gtm/gtm'
import { SearchParamsProvider } from '@/features/context'
import { ScriptProps } from 'next/script'

const notojp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-notojp',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | INAZUMA START PROJECT',
    absolute: 'INAZUMA START PROJECT',
  },
  description: '',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const gtmArgs: ScriptProps = { strategy: 'afterInteractive' }
  return (
    <html lang="ja">
      <body className={`${notojp.variable}  flex min-h-screen flex-col justify-between font-sans text-black`}>
        <Suspense>
          <GoogleTagManagerHead {...gtmArgs} />
          <GoogleTagManagerBody />
          <SearchParamsProvider>{children}</SearchParamsProvider>
        </Suspense>
      </body>
    </html>
  )
}

export default RootLayout
