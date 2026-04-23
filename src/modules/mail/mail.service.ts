import emailjs from '@emailjs/browser';


function generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const mailService = {
    async sendVerificationCode(toEmail: string): Promise<string> {
        const code = generateCode();

        const templateParams = {
            to_email: toEmail, 
            verification_code: code,
        }

        await emailjs.send(
            'service_bwc7w3l',
            'template_nkzhzgh',
            templateParams,
            { 
                publicKey: 'oo2vhpTMpp57OA9Tn'
            },
        );

        return code;
    },
};