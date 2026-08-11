import { IsOptional, IsBoolean, IsIn } from "class-validator";
import { PaginationQueryDto } from "../../../common/dto/pagination-query.dto";
import { Transform } from "class-transformer";

export class FindReviewsQueryDto extends PaginationQueryDto {
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    @IsBoolean()
    is_approved?: boolean;
        
    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    sort_order?: 'ASC' | 'DESC' = 'DESC';
}