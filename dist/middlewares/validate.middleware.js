"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMiddleware = validateMiddleware;
const app_errors_1 = require("../errors/app.errors");
function validateMiddleware(schema) {
    return async (req, res, next) => {
        try {
            req.body = await schema.validate(req.body, { abortEarly: false });
            next();
        }
        catch (error) {
            next(new app_errors_1.ValidationError(error.errors?.join(', ') ?? 'Validation failed'));
        }
    };
}
