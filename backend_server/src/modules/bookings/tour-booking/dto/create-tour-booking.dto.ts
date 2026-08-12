import { Transform, Type } from 'class-transformer';
import {
    IsBoolean,
    IsDateString,
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Matches,
    Max,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';

export class CreateTourBookingDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @Transform(({ value }) => value.trim())
    full_name!: string;

    @IsNotEmpty()
    @IsEmail()
    @Transform(({ value }) => value.trim().toLowerCase())
    email!: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[+]?[0-9]{10,15}$/, {
        message:
            'Phone number must contain 10 to 15 digits and may start with +',
    })
    phone!: string;

    @IsNotEmpty()
    @IsDateString()
    booking_date!: Date;

    @IsNotEmpty()
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'booking_time must be a valid time in HH:MM format',
    })
    booking_time!: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(100)
    @Type(() => Number)
    adult_count!: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(100)
    @Type(() => Number)
    children_count!: number;

    // Pickup address/location
    @IsOptional()
    @IsString()
    @MaxLength(500)
    @Transform(({ value }) => value?.trim())
    pickup_location?: string;

    // OPTIONAL latitude
    @IsOptional()
    @IsNumber()
    @Min(-90)
    @Max(90)
    @Type(() => Number)
    pickup_location_latitude?: number;

    // OPTIONAL longitude
    @IsOptional()
    @IsNumber()
    @Min(-180)
    @Max(180)
    @Type(() => Number)
    pickup_location_longitude?: number;

    @IsOptional()
    @IsString()
    message?: string;

    @IsNotEmpty()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    @IsBoolean()
    is_agree!: boolean;
}