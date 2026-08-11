import { Transform } from "class-transformer";
import { Allow, ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateBlogDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(255)
    title!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(500)
    excerpt!: string;

    @IsString()
    @IsNotEmpty()
    content!: string;

    @IsArray()
    @IsOptional()
    @ArrayMinSize(1)
    @IsString({ each: true })
    @Transform(({ value }) => 
        Array.isArray(value) ? value : value?.split(',').map((s: string) => s.trim())
    )
    tags?: string[];

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(160)
    meta_description?: string;

    @IsArray()
    @IsOptional()
    @ArrayMinSize(1)
    @IsString({ each: true })
    @Transform(({ value }) => 
        Array.isArray(value) ? value : value?.split(',').map((s: string) => s.trim())
    )
    meta_keywords?: string[];

    @Allow()
    file?: unknown;
}