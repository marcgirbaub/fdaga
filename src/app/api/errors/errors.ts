import { NextResponse } from 'next/server';

export const errorNames = {
  DATABASE_REQUEST_ERROR: 'DATABASE_REQUEST_ERROR',
  EXTERNAL_API_REQUEST_ERROR: 'EXTERNAL_API_REQUEST_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  GENERIC_ERROR: 'GENERIC_ERROR',
};

export const errorMessages = {
  UNEXPECTED_ERROR: 'Unknown error',
  NO_EVENTS_FOUND: 'No events found',
};

export const errorStatus = {
  INTERNAL_SERVER_ERROR: 500,
};

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = errorNames.GENERIC_ERROR;
  }
}

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

export function handleError(error: any): NextResponse {
  let errorMessage = errorMessages.UNEXPECTED_ERROR;
  let statusCode = 500;

  if (error instanceof AppError || error instanceof Error) {
    errorMessage = error.message;
    statusCode = error instanceof AppError ? error.statusCode : 500;
  }

  return NextResponse.json({ error: errorMessage }, { status: statusCode });
}
