export class AppError extends Error {
    constructor(
        public statusCode: number,
        message: string,
    ) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class BadRequestError extends AppError {
    constructor(message: string = 'Bad request') {
        super(400, message);
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(400, message);
    }
}

export class AuthenticationError extends AppError {
    constructor(message: string) {
        super(401, message);
    }
}

export class NotFoundError extends AppError {
    constructor(entity: string) {
        super(404, `${entity} not found`);
    }
}

export class ConflictError extends AppError {
    constructor(entity: string) {
        super(409, `${entity} already exists`);
    }
}

export class InternalServerError extends AppError {
    constructor(message: string) {
        super(500, message);
    }
}