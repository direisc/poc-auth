import '@/styles/globals.css'
import '@/styles/modal.css'

import { AuthProvider } from '@/auth/AuthProvider'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SnackbarProvider>
  )
}
