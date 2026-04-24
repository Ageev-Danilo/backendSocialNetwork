const emailjs = require('@emailjs/nodejs');

const SERVICE_ID  = 'service_bwc7w3l';
const TEMPLATE_ID = 'template_nkzhzgh';
const PUBLIC_KEY  = 'oo2vhpTMpp57OA9Tn';
const PRIVATE_KEY = 'dwCCXQp5i7kcUpnYKJnJm';

function generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const mailService = {
    async sendVerificationCode(toEmail: string): Promise<string> {
        const code = generateCode();

        await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            { to_email: toEmail, verification_code: code },
            { publicKey: PUBLIC_KEY, privateKey: PRIVATE_KEY },
        );

        return code;
    },
};