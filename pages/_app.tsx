import '@/styles/globals.css'
import clsx from 'clsx'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { fredoka, inter } from '../utils/font'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <style>{`
          :root {
            --font-inter: ${inter.style.fontFamily}
          }
        `}</style>

        <title>Karaoke</title>
        <meta name="description" content="UltraStar-inspired karaoke on the web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎤</text></svg>"
        />
      </Head>
      <main className={clsx(inter.variable, fredoka.variable)}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
