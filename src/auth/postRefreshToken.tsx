import { handleFetch } from './handleFetch'

// TODO move to .env
process.env.NEXT_PUBLIC_AUTH_API_V2_URL = 'http://localhost:3000/api/v2'

export const postRefreshToken = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_V2_URL}/token/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(handleFetch)
    .catch(console.error)
  // TODO we should copy handleError?
  // await handleError(res, true)
}
