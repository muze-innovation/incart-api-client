export class InCartError extends Error {
  constructor(message: string, public readonly responseData :any) {
    super(message)
  }
}