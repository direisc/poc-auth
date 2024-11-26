import { Links } from '@/components/links'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>MFA Pass Code</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <br />
        <Links />
      </main>
    </>
  )
}
