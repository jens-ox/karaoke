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
      </Head>
      <div className={clsx(inter.variable, fredoka.variable)}>
        <Component {...pageProps} />
      </div>
    </>
  )
}
