"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailController = void 0;
const mail_service_1 = require("./mail.service");
exports.mailController = {
    async sendVerificationCode(req, res, next) {
        try {
            const { email } = req.body;
            if (!email) {
                res.status(400).json({ message: 'Email обовʼязковий' });
                return;
            }
            console.log(email);
            const code = await mail_service_1.mailService.sendVerificationCode(email);
            res.status(200).json({ code });
            console.log(code);
        }
        catch (error) {
            next(error);
        }
    },
};
//# sourceMappingURL=mail.controller.js.map