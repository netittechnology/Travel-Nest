import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateExperienceDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    title!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(300)
    category!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    duration!: string;

    @IsNotEmpty()
    @IsString()
    content!: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(-90)
    @Max(90)
    @Type(() => Number)
    latitude!: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(-180)
    @Max(180)
    @Type(() => Number)
    longitude!: number;
}