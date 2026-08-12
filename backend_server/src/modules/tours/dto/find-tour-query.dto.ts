import { IsBoolean, IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
import { TourType } from '../enums/tour-type.enum';
import { PaginationQueryDto } from "../../../common/dto/pagination-query.dto";
import { Transform } from "class-transformer";

export class FindTourQueryDto extends PaginationQueryDto {
    @IsOptional()
    @IsString()
    search_term?: string;

    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })

    @IsBoolean()
    is_available?: boolean;

    @IsOptional()
    @IsEnum(TourType)
    tour_type?: TourType;

    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    sort_order?: 'ASC' | 'DESC' = 'DESC';
}