import { IsBoolean, IsString, IsIn, IsOptional } from "class-validator";
import { PaginationQueryDto } from "../../../common/dto/pagination-query.dto";
import { Transform } from "class-transformer";

export class FindGalleriesQueryDto extends PaginationQueryDto {
    @IsOptional()
    @IsString()
    @IsOptional()
    category?: string;
    
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    @IsBoolean()
    is_published?: boolean;
    
    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    sort_order?: 'ASC' | 'DESC' = 'DESC';
}