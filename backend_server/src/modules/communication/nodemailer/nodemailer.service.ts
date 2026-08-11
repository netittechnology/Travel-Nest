import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { SendMailOptions, Transporter } from 'nodemailer';

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    cc?: string | string[];
    bcc?: string | string[];
    attachments?: SendMailOptions['attachments'];
}

@Injectable()
export class NodemailerService {
    private readonly logger = new Logger(NodemailerService.name);

    constructor(
        @Inject('NODEMAILER')
        private readonly transporter: Transporter,

        private readonly configService: ConfigService,
    ) {
        this.verifySMTP();
    }

    private async verifySMTP(): Promise<void> {
        try {
            await this.transporter.verify();

            this.logger.log('SMTP connection verified successfully');
        } catch (error) {
            this.logger.error(
                'SMTP connection verification failed',
                error instanceof Error ? error.stack : String(error),
            );
        }
    }

    async sendEmail(options: SendEmailOptions): Promise<void> {
        try {
            const from = this.configService.get<string>('smtp.from');
            const host = this.configService.get<string>('smtp.host');
            const port = this.configService.get<number>('smtp.port');
            const user = this.configService.get<string>('smtp.user');

            this.logger.log(
                `Attempting SMTP send → host=${host}, port=${port}, user=${user}, from=${from}`,
            );

            const mailOptions: SendMailOptions = {
                from,
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: options.html,
                cc: options.cc,
                bcc: options.bcc,
                attachments: options.attachments,
            };

            const result = await this.transporter.sendMail(mailOptions);

            this.logger.log(
                `Email sent successfully → messageId=${result.messageId}`,
            );

            this.logger.log(
                `Accepted recipients: ${JSON.stringify(result.accepted)}`,
            );

            this.logger.log(
                `Rejected recipients: ${JSON.stringify(result.rejected)}`,
            );
        } catch (error) {
            this.logger.error(
                `Failed to send email → to=${options.to}, subject="${options.subject}"`,
                error instanceof Error ? error.stack : String(error),
            );

            throw error;
        }
    }
}