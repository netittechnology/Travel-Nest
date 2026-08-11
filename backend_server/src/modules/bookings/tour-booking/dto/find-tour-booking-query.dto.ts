import { Transform } from "class-transformer";
import { PaginationQueryDto } from "../../../../common/dto/pagination-query.dto";
import { IsBoolean, IsDateString, IsEnum, IsIn, IsOptional, ValidateIf } from "class-validator";
import { BookingStatus } from "../entities/tour-booking.entity";

export class FindTourBookingsQueryDto extends PaginationQueryDto {
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
    is_agree?: boolean;

    @IsOptional()
    @IsEnum(BookingStatus)
    status?: BookingStatus;

    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    sort_order?: 'ASC' | 'DESC' = 'DESC';
}