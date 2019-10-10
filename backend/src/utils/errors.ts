/**
 * Base class for App errors
 */
class AppError extends Error{
  type: string = null
  code: number = null

  constructor(message: string, type: string, code: number){
    super()
    this.message = message
    this.type = type
    this.code = code
  }
}

/**
 * Not found error
 */
class NotFound extends AppError{
  constructor(message?: string){
    super(message || "Sorry, team of highly trained monkeys from VUT FIT labs are working on fixing your issue", 'NOT_FOUND', 404)
  }
}

/**
 * Validation error
 */
class ValidationError extends AppError{
  constructor(message?: string){
    super(message || "Validation failed", 'VALIDATION_ERROR', 400)
  }
}

/**
 * Unauthorized error
 */
class AuthorizationError extends AppError{
  constructor(message?: string){
    super(message || "Unauthorized access", 'UNAUTHORIZED_ERROR', 401)
  }
}

/**
 * Duplication error
 */
class DuplicationError extends AppError{
  constructor(message?: string){
    super(message || "Duplication error", 'DUPLICATION_ERROR', 400)
  }
}

/**
 * Internal server error
 */
class InternalError extends AppError{
  constructor(message?: string){
    super(message || "Internal server error... BOOOOOOM💥", 'INTERNAL_ERROR', 500)
  }
}

export = {
  AppError,
  NotFound,
  ValidationError,
  AuthorizationError,
  DuplicationError,
  InternalError
}