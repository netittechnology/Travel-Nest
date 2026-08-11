import { Inject, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";

export class GoogleOAuthService {
    constructor(
        @Inject('GOOGLE_OAUTH')
        private readonly googleOAuth: OAuth2Client,

        private readonly configService: ConfigService,
    ) {}

    async getAuthUrl(): Promise<string> {
        return this.googleOAuth.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            scope: ["openid", "email", "profile"],
        });
    }

    async authenticateUser(code: string) {
        const { tokens } = await this.googleOAuth.getToken(code);
        if (!tokens.id_token) {
            throw new UnauthorizedException('Invalid authentication code');
        }

        this.googleOAuth.setCredentials(tokens);

        const ticket = await this.googleOAuth.verifyIdToken({
            idToken: tokens.id_token,
            audience: this.configService.get<string>('google.client_id'),
        });

        const payload = ticket.getPayload();
        if (!payload) {
            throw new UnauthorizedException('Invalid or missing token payload');
        }
        
        return {
            email: payload.email,
            username: payload.name,
            picture: payload.picture,
            googleId: payload.sub,
        };
    }
}