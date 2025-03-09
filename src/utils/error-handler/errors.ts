// Base API Error
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Specific API Errors
export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden access') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = 'Internal server error') {
    super(message, 500);
    this.name = 'InternalServerError';
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = 'Bad request') {
    super(message, 400);
    this.name = 'BadRequestError';
  }
}

export class ServiceUnavailableError extends ApiError {
  constructor(message: string = 'Service unavailable') {
    super(message, 503);
    this.name = 'ServiceUnavailableError';
  }
}

// Network Error
export class NetworkError extends Error {
  constructor(message: string = 'Network error') {
    super(message);
    this.name = 'NetworkError';
  }
}

// Validation Error
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Other Errors
export class UnknownError extends Error {
  constructor(message: string = 'An unknown error occurred') {
    super(message);
    this.name = 'UnknownError';
  }
}
