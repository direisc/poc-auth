import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'

export default function Login() {
  const router = useRouter()

  useEffect(() => {
    if (router.query.error) {
      const shouldCover = router.query.cover === 't'
      if (shouldCover) {
        enqueueSnackbar(router.query.error, { variant: 'warning' })
        // toggleNotification({ message: error || 'Something went wrong' })
      }

      if (!shouldCover) {
        enqueueSnackbar(router.query.error, { variant: 'error' })
      }
    }
  }, [router.query.error, router.query.cover])

  return (
    <>
      <h1>Login</h1>
      <form action={`${process.env.NEXT_PUBLIC_AUTH_API_V2_URL}/login`} method="post" encType='multipart/form-data'>
        <div>
          <label htmlFor='email'>Username:</label>
          <input id='email' name='email' type='email' defaultValue='it@check21.com' required placeholder='Username' />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input id='password' name='password' type='password' defaultValue='1234aB!@' required placeholder='password' />
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  )
}
