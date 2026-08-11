import { Type } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty()
    @IsEmail()
    author_email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    author_name!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    author_country!: string;

    @IsNotEmpty()
    @IsString()
    text!: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(5)
    @Type(() => Number)
    rating!: number;
}