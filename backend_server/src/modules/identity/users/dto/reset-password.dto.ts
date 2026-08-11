import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsPassword } from "../../../../common/validators/is-password.validator";

export class RequestEmailDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email!: string;
}

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    token!: string;

    @IsNotEmpty()
    @IsString()
    @IsPassword()
    readonly newPassword!: string;
}