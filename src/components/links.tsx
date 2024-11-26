import Link from 'next/link'
import { useAuthContext } from '../auth/useAuthContext'

export const Links = () => {
  const { logout } = useAuthContext()
  return (
    <>
      <h2>Public</h2>
      <Link href={'/accept-invitation'}>accept-invitation</Link>
      <br />
      <Link href={'/access-denied'}>access-denied</Link>

      <h2>Auth</h2>
      <Link href={'/auth/login'}>login</Link>
      <br />
      <Link href={'/auth/reset-password/random_token'}>reset-password</Link>
      <br />
      <Link href={'/auth/forgot-password'}>forgot-password</Link>
      <br />
      <Link href={'/auth/mfa'}>mfa</Link>
      <br />
      <Link href={'/auth/mfa-pass-code'}>mfa-pass-code</Link>

      <h2>Authenticated</h2>
      <Link href={'/'}>dashboard</Link>
      <br />
      <Link href={'/management'}>management</Link>

      <br />
      <br />
      <button onClick={() => { logout() }}>logout</button>
    </>
  )
}
