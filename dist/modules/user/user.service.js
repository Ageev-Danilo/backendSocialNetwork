"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const app_errors_1 = require("../../errors/app.errors");
const env_1 = require("../../config/env");
const user_repository_1 = require("./user.repository");
const defaultData = {
    signature: 'yoursignature',
    isTextSignature: true,
    isImageSignature: false,
};
exports.UserService = {
    async login(dto) {
        const user = await user_repository_1.UserRepository.findByEmailWithPassword(dto.email);
        if (!user)
            throw new app_errors_1.NotFoundError('User');
        const isMatched = await (0, bcryptjs_1.compare)(dto.password, user.password);
        if (!isMatched)
            throw new app_errors_1.AuthenticationError('Passwords do not match');
        const token = (0, jsonwebtoken_1.sign)({ id: user.id }, env_1.env.SECRET_KEY, {
            expiresIn: env_1.env.TOKEN_TTL,
        });
        return { token };
    },
    async register(dto) {
        const existing = await user_repository_1.UserRepository.findByEmail(dto.email);
        if (existing)
            throw new app_errors_1.ConflictError('User with such email');
        const hashedPassword = await (0, bcryptjs_1.hash)(dto.password, 10);
        const created = await user_repository_1.UserRepository.create({
            email: dto.email,
            password: hashedPassword,
            username: dto.username ?? null,
        });
        const token = (0, jsonwebtoken_1.sign)({ id: created.id }, env_1.env.SECRET_KEY, {
            expiresIn: env_1.env.TOKEN_TTL,
        });
        return { token };
    },
    async me(dto) {
        const user = await user_repository_1.UserRepository.findById(dto.userId);
        if (!user)
            throw new app_errors_1.NotFoundError('User');
        return user;
    },
    async updateProfile(dto, data) {
        const user = await user_repository_1.UserRepository.findById(dto.userId);
        if (!user) {
            throw new app_errors_1.NotFoundError('User');
        }
        const updatedData = { ...defaultData, ...data };
        const updatedUser = await user_repository_1.UserRepository.updateProfile(dto.userId, updatedData);
        return updatedUser;
    },
};
//# sourceMappingURL=user.service.js.map