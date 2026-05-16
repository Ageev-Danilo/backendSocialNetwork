"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateMiddleware = authenticateMiddleware;
const jsonwebtoken_1 = require("jsonwebtoken");
const app_errors_1 = require("../errors/app.errors");
const env_1 = require("../config/env");
function authenticateMiddleware(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        next(new app_errors_1.AuthenticationError('No authorization provided!'));
        return;
    }
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer' || !token) {
        next(new app_errors_1.AuthenticationError('Authorization is in wrong format!'));
        return;
    }
    try {
        const userData = (0, jsonwebtoken_1.verify)(token, env_1.env.SECRET_KEY);
        if (typeof userData === 'string') {
            next(new app_errors_1.AuthenticationError('JWT is in wrong format!'));
            return;
        }
        res.locals.userId = userData.id;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            next(new app_errors_1.AuthenticationError('Token is expired.'));
            return;
        }
        next(error);
    }
}
