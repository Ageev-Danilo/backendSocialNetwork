"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailRouter = void 0;
const express_1 = require("express");
const mail_controller_1 = require("./mail.controller");
exports.mailRouter = (0, express_1.Router)();
exports.mailRouter.post('/send-verification', mail_controller_1.mailController.sendVerificationCode);
