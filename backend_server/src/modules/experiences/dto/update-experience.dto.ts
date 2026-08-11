import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class UpdateExperienceDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    title?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(300)
    category?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    duration?: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsNumber()
    @Min(-90)
    @Max(90)
    @Type(() => Number)
    latitude?: number;

    @IsOptional()
    @IsNumber()
    @Min(-180)
    @Max(180)
    @Type(() => Number)
    longitude?: number;
}