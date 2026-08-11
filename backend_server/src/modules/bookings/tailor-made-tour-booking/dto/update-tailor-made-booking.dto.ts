import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsArray, IsString, MaxLength, Min, MinLength } from "class-validator";
import { MediaType, Style, Type, Vehicle } from "../entities/tailor-made-bookings.entity";

export class UpdateTailorMadeBookingStep2Dto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @Transform(({ value }) => value.trim())
    pickup_location!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @Transform(({ value }) => value.trim())
    drop_location!: string;

    @IsNotEmpty()
    @IsDateString()
    start_date!: string;

    @IsNotEmpty()
    @IsDateString()
    end_date!: string;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @Transform(({ value }) =>
        Array.isArray(value) ? value.map(v => v.trim()) : value
    )
    destination!: string[];
}

export class UpdateTailorMadeBookingStep3Dto {
    @IsNotEmpty()
    @IsEnum(Style)
    travel_style!: Style;

    @IsNotEmpty()
    @IsEnum(Type)
    experience_type!: Type;

    @IsNotEmpty()
    @IsEnum(Vehicle)
    vehicle_preference!: Vehicle;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Transform(({ value }) => Number(value))
    budget_per_day!: number;
}

export class UpdateTailorMadeBookingStep4Dto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    special_requests?: string;

    @IsNotEmpty()
    @IsEnum(MediaType)
    how_know_us!: MediaType;

    @IsNotEmpty()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    @IsBoolean()
    is_agree!: boolean;
}