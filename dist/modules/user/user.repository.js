"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client/runtime/client");
const app_errors_1 = require("../../errors/app.errors");
const client_2 = require("../../prisma/client");
const defaultData = {
    pseudonym: 'pseudonym',
    signature: 'yoursignature',
    isTextSignature: true,
    isImageSignature: false,
};
exports.UserRepository = {
    async findByEmailWithPassword(email) {
        try {
            return await client_2.PrismaClient.user.findFirst({
                where: { email },
            });
        }
        catch (error) {
            if (error instanceof client_1.PrismaClientKnownRequestError) {
                if (['P2000', 'P2005', 'P2006', 'P2007', 'P2009'].includes(error.code)) {
                    throw new app_errors_1.ValidationError('WRONG_QUERY');
                }
            }
            throw new app_errors_1.InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
    async findByEmail(email) {
        try {
            return await client_2.PrismaClient.user.findFirst({
                where: { email },
                omit: { password: true },
            });
        }
        catch (error) {
            if (error instanceof client_1.PrismaClientKnownRequestError) {
                if (['P2000', 'P2005', 'P2006', 'P2007', 'P2009'].includes(error.code)) {
                    throw new app_errors_1.ValidationError('WRONG_QUERY');
                }
            }
            throw new app_errors_1.InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
    async create(data) {
        try {
            return await client_2.PrismaClient.user.create({
                data,
                omit: { password: true },
            });
        }
        catch (error) {
            if (error instanceof client_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002')
                    throw new app_errors_1.ValidationError('TOO_MUCH_VALUES');
                if (['P2000', 'P2005', 'P2006', 'P2007'].includes(error.code)) {
                    throw new app_errors_1.ValidationError('WRONG_QUERY');
                }
            }
            throw new app_errors_1.InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
    async findById(id) {
        try {
            return await client_2.PrismaClient.user.findFirstOrThrow({
                where: { id },
                omit: { password: true },
            });
        }
        catch (error) {
            if (error instanceof client_1.PrismaClientKnownRequestError) {
                if (['P2000', 'P2005', 'P2006', 'P2007', 'P2009'].includes(error.code)) {
                    throw new app_errors_1.ValidationError('WRONG_QUERY');
                }
            }
            throw new app_errors_1.InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
    async updateProfile(id, data) {
        try {
            return await client_2.PrismaClient.profile.upsert({
                where: { userId: id },
                update: { ...data },
                create: {
                    userId: id,
                    ...data,
                },
            });
        }
        catch (error) {
            throw new app_errors_1.InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
};
//# sourceMappingURL=user.repository.js.map