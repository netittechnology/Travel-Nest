import { Injectable, Logger } from '@nestjs/common';
import { NodemailerService } from './nodemailer/nodemailer.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommunicationService {
    private readonly logger = new Logger(CommunicationService.name);

    constructor(
        private readonly nodemailerService: NodemailerService,
        private readonly configService: ConfigService,
    ) {}

    async sendResetPasswordToken(email: string, token: string): Promise<any> {
        const isProduction = this.configService.get<string>('NODE_ENV') === 'production';

        const targetUrl = isProduction
            ? this.configService.get<string>('origins.production.admin_panel')
            : this.configService.get<string>('origins.development.admin_panel');

        const APP_NAME = this.configService.get<string>('APP_NAME');

        // Reset URL
        const resetUrl = `${targetUrl}/reset-password?token=${token}`;

        await this.nodemailerService.sendEmail({
            to: email,
            subject: `Reset Your Password - ${APP_NAME}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2>Password Reset Request</h2>
                    <p>You requested to reset your password. Click the link below to create a new password:</p>
                    <p><a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0;">Reset Password</a></p>
                    <p><strong>Important:</strong></p>
                    <ul>
                        <li>This link expires in 15 minutes</li>
                        <li>If you didn't request this, please ignore this email</li>
                    </ul>
                    <p>If the button doesn't work, copy this link: <br><code>${resetUrl}</code></p>
                    <hr>
                    <p style="font-size: 12px; color: #666;">This is an automated email, please do not reply.</p>
                </div>
            `,
        });

        this.logger.log(`Password reset email sent to: ${email}`);
    }
}
