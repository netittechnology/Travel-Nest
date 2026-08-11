import { plainToInstance } from 'class-transformer';
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Max, Min, ValidateIf, validateSync } from 'class-validator';

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
};

class EnvironmentVariables {
    // Server
    @IsInt()
    @Min(0)
    @Max(65535)
    @IsOptional()
    PORT!: number;

    @IsEnum(Environment)
    @IsNotEmpty()
    NODE_ENV!: Environment;

    // JWT
    @IsString()
    @IsNotEmpty()
    JWT_SECRET!: string;


    // MySQL Database
    @IsString()
    @IsNotEmpty()
    DB_HOST!: string;

    @IsInt()
    @Min(1)
    @Max(65535)
    @IsNotEmpty()
    DB_PORT!: number;

    @IsString()
    @IsNotEmpty()
    DB_USER!: string;

    @IsOptional()
    @IsString()
    DB_PASSWORD!: string;

    @IsString()
    @IsNotEmpty()
    DB_NAME!: string;


    // Origins
    @ValidateIf((env) => env.NODE_ENV === Environment.Production)
    @IsUrl({ require_tld: false })
    PRODUCTION_ADMIN_PANEL_WEB_URL?: string;

    @ValidateIf((env) => env.NODE_ENV === Environment.Production)
    @IsUrl({ require_tld: false })
    PRODUCTION_CLIENT_PANEL_WEB_URL?: string;

    @ValidateIf((env) => env.NODE_ENV === Environment.Development)
    @IsUrl({ require_tld: false })
    DEVELOPMENT_ADMIN_PANEL_WEB_URL!: string;

    @ValidateIf((env) => env.NODE_ENV === Environment.Development)
    @IsUrl({ require_tld: false })
    DEVELOPMENT_CLIENT_PANEL_WEB_URL!: string;


    // Google OAuth
    @IsString()
    @IsNotEmpty()
    GOOGLE_CLIENT_ID!: string;

    @IsString()
    @IsNotEmpty()
    GOOGLE_CLIENT_SECRET!: string;

    @IsNotEmpty()
    @IsUrl({ require_tld: false })
    GOOGLE_REDIRECT_URL!: string;


    // Cloudinary
    @IsString()
    @IsNotEmpty()
    CLOUDINARY_CLOUD_NAME!: string;

    @IsString()
    @IsNotEmpty()
    CLOUDINARY_API_KEY!: string;

    @IsString()
    @IsNotEmpty()
    CLOUDINARY_API_SECRET!: string;


    // SMTP - mail server
    @IsString()
    @IsOptional()
    MAIL_HOST!: string;

    @IsInt()
    @Min(1)
    @Max(65535)
    @IsOptional()
    MAIL_PORT!: number;

    @IsString()
    @IsNotEmpty()
    MAIL_USER!: string;

    @IsString()
    @IsNotEmpty()
    MAIL_PASSWORD!: string;

    @IsEmail()
    @IsNotEmpty()
    MAIL_FROM!: string;
};

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        const messages = errors
            .map((error) => Object.values(error.constraints ?? {}).join(', '))
            .join('\n');

        throw new Error(`Environment validation failed:\n${messages}`);
    }

    return validatedConfig;
}