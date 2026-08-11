import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { UserRole } from "../../entities/user.entity";
import { TransformBoolean } from "../../../../common/transformers/boolean.transformer";

export class FindUsersQueryDto extends PaginationQueryDto {
    @IsOptional()
    @IsString()
    readonly search_term?: string;

    @IsOptional()
    @IsEnum(UserRole)
    readonly role?: UserRole;

    @IsOptional()
    @IsBoolean()
    @TransformBoolean()
    readonly is_active?: boolean;

    @IsOptional()
    @IsEnum(['ASC', 'DESC'] as const)
    readonly sort_order?: 'ASC' | 'DESC' = 'DESC';    
}