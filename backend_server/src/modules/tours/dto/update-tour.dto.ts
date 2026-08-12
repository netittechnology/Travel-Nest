import { Transform, Type } from "class-transformer";
import { Allow, ArrayMinSize, IsArray, IsOptional, IsString, MaxLength, ValidateNested, IsEnum } from 'class-validator';
import { TourType } from '../enums/tour-type.enum';

class ItineraryDayDto {
    @IsOptional()
    @IsString()
    day?: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    details?: string;

    @IsOptional()
    @IsString()
    location?: string;
}

export class UpdateTourDto {
    @IsString()
    @IsOptional()
    @MaxLength(255)
    title?: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    location?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    duration?: string;
    
    @IsOptional()
    @IsEnum(TourType)
    tour_type?: TourType;

    @IsArray()
    @IsOptional()
    @ArrayMinSize(1)
    @IsString({ each: true })
    @Transform(({ value }) =>
        Array.isArray(value) ? value : value?.split(',').map((s: string) => s.trim())
    )
    includes?: string[];

    @IsArray()
    @IsOptional()
    @ArrayMinSize(1)
    @IsString({ each: true })
    @Transform(({ value }) =>
        Array.isArray(value) ? value : value?.split(',').map((s: string) => s.trim())
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