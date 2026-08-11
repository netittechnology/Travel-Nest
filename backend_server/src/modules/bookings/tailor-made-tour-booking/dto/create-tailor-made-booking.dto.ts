import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateTailorMadeBookingDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @Transform(({ value }) => value.trim())
    full_name!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @Transform(({ value }) => value.trim())
    country!: string;

    @IsNotEmpty()
    @IsEmail()
    @Transform(({ value }) => value.trim().toLowerCase())
    email!: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[+]?[0-9]{10,15}$/, { message: 'WhatsApp number must contain 10 to 15 digits and may start with +' })
    whatsapp_number!: string;
}