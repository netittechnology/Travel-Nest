import { Transform, Type } from "class-transformer";
import { Allow, ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateHotelDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    name!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    short_description!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    category!: string;

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