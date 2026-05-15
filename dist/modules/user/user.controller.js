"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
exports.UserController = {
    async login(req, res, next) {
        try {
            const token = await user_service_1.UserService.login(req.body);
            res.status(200).json(token);
        }
        catch (error) {
            next(error);
        }
    },
    async register(req, res, next) {
        try {
            const token = await user_service_1.UserService.register(req.body);
            res.status(201).json(token);
        }
        catch (error) {
            next(error);
        }
    },
    async me(req, res, next) {
        try {
            const me = await user_service_1.UserService.me({ userId: res.locals.userId });
            res.status(200).json(me);
        }
        catch (error) {
            next(error);
        }
    },
    async updateProfile(req, res, next) {
        try {
            const updatedUser = await user_service_1.UserService.updateProfile({ userId: 1 }, req.body);
            res.status(200).json(updatedUser);
        }
        catch (error) {
            next(error);
        }
    },
};
//# sourceMappingURL=user.controller.js.map