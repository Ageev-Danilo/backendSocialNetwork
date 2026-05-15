"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.ConflictError = exports.NotFoundError = exports.AuthenticationError = exports.ValidationError = exports.BadRequestError = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}
exports.AppError = AppError;
class BadRequestError extends AppError {
    constructor(message = 'Bad request') {
        super(400, message);
    }
}
exports.BadRequestError = BadRequestError;
class ValidationError extends AppError {
    constructor(message) {
        super(400, message);
    }
}
exports.ValidationError = ValidationError;
class AuthenticationError extends AppError {
    constructor(message) {
        super(401, message);
    }
}
exports.AuthenticationError = AuthenticationError;
class NotFoundError extends AppError {
    constructor(entity) {
        super(404, `${entity} not found`);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends AppError {
    constructor(entity) {
        super(409, `${entity} already exists`);
    }
}
exports.ConflictError = ConflictError;
class InternalServerError extends AppError {
    constructor(message) {
        super(500, message);
    }
}
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=app.errors.js.map