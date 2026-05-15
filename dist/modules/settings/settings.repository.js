"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRepository = void 0;
const client_1 = require("../../prisma/client");
const client_2 = require("@prisma/client/runtime/client");
const app_errors_1 = require("../../errors/app.errors");
exports.SettingsRepository = {
    async findByUserId(userId) {
        try {
            return await client_1.PrismaClient.profile.findUnique({
                where: { userId },
            });
        }
        catch (error) {
            if (error instanceof client_2.PrismaClientKnownRequestError) {
                throw new app_errors_1.ValidationError('WRONG_QUERY');
            }
            throw new app_errors_1.InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
    async update(userId, data) {
        try {
            console.log(userId);
            return await client_1.PrismaClient.profile.upsert({
                where: { userId },
                create: {
                    ...data,
                    userId,
                },
                update: data,
            });
        }
        catch (error) {
            if (error instanceof client_2.PrismaClientKnownRequestError) {
                console.log(error);
                throw new app_errors_1.ValidationError('WRONG_QUERY');
            }
            console.log(error);
            throw new app_errors_1.InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
};
//# sourceMappingURL=settings.repository.js.map