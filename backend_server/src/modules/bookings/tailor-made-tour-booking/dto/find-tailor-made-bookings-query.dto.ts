import { IsBoolean, IsDateString, IsEnum, IsIn, IsOptional, ValidateIf } from "class-validator";
import { PaginationQueryDto } from "../../../../common/dto/pagination-query.dto";
import { Transform } from "class-transformer";
import { MediaType, Style, Type, Vehicle } from "../entities/tailor-made-bookings.entity";

export class FindTailorMadeBookingsQueryDto extends PaginationQueryDto {
    @IsOptional()
    @IsDateString()
    booking_date_from?: string;

    @IsOptional()
    @IsDateString()
    @ValidateIf(o => !!o.booking_date_from)
    booking_date_to?: string;

    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    @IsBoolean()
    is_read?: boolean;
    
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    @IsBoolean()
    is_agree?: boolean;

    @IsOptional()
    @IsEnum(Style)
    travel_style?: Style;

    @IsOptional()
    @IsEnum(Type)
    experience_type?: Type;

    @IsOptional()
    @IsEnum(Vehicle)
    vehicle_preference?: Vehicle;

    @IsOptional()
    @IsEnum(MediaType)
    how_know_us?: MediaType;

    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    sort_order?: 'ASC' | 'DESC' = 'DESC';
}