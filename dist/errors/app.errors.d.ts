export declare class AppError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string);
}
export declare class BadRequestError extends AppError {
    constructor(message?: string);
}
export declare class ValidationError extends AppError {
    constructor(message: string);
}
export declare class AuthenticationError extends AppError {
    constructor(message: string);
}
export declare class NotFoundError extends AppError {
    constructor(entity: string);
}
export declare class ConflictError extends AppError {
    constructor(entity: string);
}
export declare class InternalServerError extends AppError {
    constructor(message: string);
}
//# sourceMappingURL=app.errors.d.ts.map