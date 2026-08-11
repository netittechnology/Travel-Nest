import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { SendMailOptions, Transporter } from "nodemailer";

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    cc?: string | string[];
    bcc?: string | string[];
    attachments?: SendMailOptions['attachments'];
};

@Injectable()
export class NodemailerService {
    private readonly logger = new Logger(NodemailerService.name);
    
    constructor(
        @Inject('NODEMAILER')
        private readonly transporter: Transporter,
        
        private readonly configService: ConfigService
    ) {}

    async sendEmail(options: SendEmailOptions): Promise<void> {
        try {
            const mailOptions = {
                from: this.configService.get<string>('smtp.from'),
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: options.html,
                cc: options.cc,
                bcc: options.bcc,
                attachments: options.attachments,
            };

            const result = await this.transporter.sendMail(mailOptions);
            
            this.logger.log(`Email sent successfully → messageId=${result.messageId}`)
        } catch (error) {
            this.logger.error(
                `Failed to send email → to=${options.to}, subject="${options.subject}"`,
                error instanceof Error ? error.stack : undefined
            );

            throw error;
        }
    }
}