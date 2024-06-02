const nodemailer = require("nodemailer")
const dotenv = require("dotenv")

dotenv.config({ path: '.env.local' })

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Activate your account " + process.env.API_URL,
            text: '',
            html: 
                `
                    <div>
                        <h1><a href="${link}">CLICK TO ACTIVATE</a></h1>
                    </div>
                `
        })
    }
}

module.exports = new MailService()