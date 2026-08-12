import { Transform, Type } from 'class-transformer';
import {
    Allow,
    ArrayMinSize,
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    ValidateNested,
} from 'class-validator';
import { TourType } from '../enums/tour-type.enum';

class ItineraryDayDto {
    @IsOptional()
    @IsString()
    day?: string;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    details!: string;

    @IsString()
    @IsNotEmpty()
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

    @IsOptional()
    @IsEnum(TourType)
    tour_type?: TourType;

    @IsArray()
    @IsOptional()
    @ArrayMinSize(1)
    @IsString({ each: true })
    @Transform(({ value }) => {
        if (Array.isArray(value)) {
            return value;
        }

        if (typeof value === 'string') {
            return value
                .split(',')
                .map((s: string) => s.trim())
                .filter(Boolean);
        }

        return value;
    })
    includes?: string[];

    @IsArray()
    @IsOptional()
    @ArrayMinSize(1)
    @IsString({ each: true })
    @Transform(({ value }) => {
        if (Array.isArray(value)) {
            return value;
        }

        if (typeof value === 'string') {
            return value
                .split(',')
                .map((s: string) => s.trim())
                .filter(Boolean);
        }

        return value;
    })
    highlights?: string[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItineraryDayDto)
    @Transform(({ value }) => {
        if (typeof value !== 'string') {
            return value;
        }

        if (!value.trim()) {
            return undefined;
        }

        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    })
    itinerary_days?: ItineraryDayDto[];

    @Allow()
    file?: unknown;
}