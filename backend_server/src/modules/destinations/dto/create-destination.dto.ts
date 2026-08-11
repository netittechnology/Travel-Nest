import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateDestinationDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    title!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    subtitle!: string;
}