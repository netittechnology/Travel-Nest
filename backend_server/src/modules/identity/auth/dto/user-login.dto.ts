import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength } from "class-validator";
import { Trim } from "../../../../common/transformers/trim.transformer";

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(128)
    @Trim()
    readonly password!: string;
}