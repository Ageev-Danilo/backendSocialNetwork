"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const envalid_1 = require("envalid");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.env = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.num)({ default: 3000 }),
    HOST: (0, envalid_1.str)({ default: '0.0.0.0' }),
    DATABASE_URL: (0, envalid_1.str)(),
    SECRET_KEY: (0, envalid_1.str)(),
    TOKEN_TTL: (0, envalid_1.str)({ default: '7d' }),
});
//# sourceMappingURL=env.js.map