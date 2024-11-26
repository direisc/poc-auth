export class FetchError extends Error {
  readonly status: number
  readonly statusText: string
  /**
   * @param asserter The assertion function that threw the error. Removes stack-trace noise if provided.
   */
  constructor(
    message: string,
    status: number = 500,
    statusText: string = 'Internal Server Error',
    options?: ErrorOptions & { asserter?: Function }
  ) {
    if (options) {
      const { asserter, ...errorOptions } = options
      super(message, errorOptions)
    } else {
      super(message)
    }
    this.status = status
    this.statusText = statusText
    Error.captureStackTrace?.(this, options?.asserter || this.constructor)
  }
}
