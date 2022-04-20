const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORISED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
};

class AppError extends Error {
    statusCode;
    isOperational;
    errorStack;
    logError;

    constructor(name: any, statusCode: any, description: any, isOperational: any, errorStack?: any, logingErrorResponse?: any) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errorStack = errorStack;
        this.logError = logingErrorResponse;
        Error.captureStackTrace(this);
    }
}

//api Specific Errors
class APIError extends AppError {
    constructor(name: any, statusCode = STATUS_CODES.INTERNAL_ERROR, description = 'Internal Server Error', isOperational = true) {
        super(name, statusCode, description, isOperational);
    }
}

//400
class BadRequestError extends AppError {
    constructor(description = 'Bad request', logingErrorResponse: any) {
        super('NOT FOUND', STATUS_CODES.BAD_REQUEST, description, true, false, logingErrorResponse);
    }
}

//400
class ValidationError extends AppError {
    constructor(description = 'Validation Error', errorStack: any) {
        super('BAD REQUEST', STATUS_CODES.BAD_REQUEST, description, true, errorStack);
    }
}

export { AppError, APIError, BadRequestError, ValidationError, STATUS_CODES };
