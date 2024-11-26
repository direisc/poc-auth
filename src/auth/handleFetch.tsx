import { FetchError } from './FetchError'

export const handleFetch = async (response: Response) => {
  // TODO login requires manage 3xx but wi should replace it by common redirect
  // after that will be `< 300`
  if (response.status >= 200 && response.status < 400) {
    return response
  }
  throw new FetchError(`FetchError ${response.status} ${response.statusText}`, response.status, response.statusText, {
    cause: await response.json(),
  })
}
