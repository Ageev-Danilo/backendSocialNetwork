"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClient = void 0;
const adapter_better_sqlite3_1 = require("@prisma/adapter-better-sqlite3");
const prisma_1 = require("../generated/prisma");
const env_1 = require("../config/env");
const adapter = new adapter_better_sqlite3_1.PrismaBetterSqlite3({ url: env_1.env.DATABASE_URL });
exports.PrismaClient = new prisma_1.PrismaClient({ adapter });
//# sourceMappingURL=client.js.map