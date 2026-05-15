"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = errorHandlerMiddleware;
const app_errors_1 = require("../errors/app.errors");
function errorHandlerMiddleware(error, _req, res, _next) {
    console.error(error);
    if (error instanceof app_errors_1.AppError) {
        res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
        return;
    }
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
}
//# sourceMappingURL=error-handler.middleware.js.map