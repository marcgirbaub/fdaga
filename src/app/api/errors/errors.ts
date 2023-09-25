export const errorNames = {
  DATABASE_REQUEST_ERROR: 'DATABASE_REQUEST_ERROR',
  EXTERNAL_API_REQUEST_ERROR: 'EXTERNAL_API_REQUEST_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
};

export const errorMessages = {
  UNEXPECTED_ERROR: 'Unknown error',
  NO_EVENTS_FOUND: 'No events found',
};

export class DatabaseRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = errorNames.DATABASE_REQUEST_ERROR;
  }
}

export class ExternalApiRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = errorNames.EXTERNAL_API_REQUEST_ERROR;
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = errorNames.VALIDATION_ERROR;
  }
}
