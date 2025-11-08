
export class EventNotFoundError extends Error { }
export class EventFullError extends Error { }
export class EventBookedByUserError extends Error { }
export class EmptyBodyError extends Error {
  constructor(message = "Request body is required") {
    super(message)
  }
}
