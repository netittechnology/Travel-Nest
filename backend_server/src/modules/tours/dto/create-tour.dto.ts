import { Transform, Type } from "class-transformer";
import {
    Allow,
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    ValidateNested,
} from "class-validator";

class ItineraryDayDto {
    @IsOptional()
    @IsString()
    day?: string;

    @IsString()
    title!: string;

    @IsString()
    description!: string;

    @IsString()
    details!: string;

    @IsString()
    location!: string;
}

export class CreateTourDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(255)
    title!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(255)
    location!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(255)
    duration?: string;

    @IsArray()
    @IsOptional()
    @ArrayMinSize(1)
    @IsString({ each: true })
    @Transform(({ value }) =>
        Array.isArray(value)
            ? value
            : value?.split(',').map((s: string) => s.trim())
    )
    includes?: string[];

    @IsArray()
    @IsOptional()
    @ArrayMinSize(1)
    @IsString({ each: true })
    @Transform(({ value }) =>
        Array.isArray(value)
            ? value
            : value?.split(',').map((s: string) => s.trim())
    )
    highlights?: string[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return JSON.parse(value);
        }
        return value;
    })
    @Type(() => ItineraryDayDto)
    itinerary_days?: ItineraryDayDto[];

    @Allow()
    file?: unknown;
}