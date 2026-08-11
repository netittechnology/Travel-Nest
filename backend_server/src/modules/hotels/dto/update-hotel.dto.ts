import { Transform, Type } from "class-transformer";
import { Allow, ArrayMinSize, IsArray, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class UpdateHotelDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    name?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    short_description?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    category?: string;

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

    @IsArray()
    @IsOptional()
    @ArrayMinSize(1)
    @IsString({ each: true })
    @Transform(({ value }) =>
        Array.isArray(value) ? value : value?.split(',').map((s: string) => s.trim())
    )
    highlight_keywords?: string[];

    @Allow()
    file?: unknown;
}