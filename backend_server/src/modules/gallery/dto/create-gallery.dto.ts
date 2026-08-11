import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateGalleryDto {
    @IsNotEmpty()
    @IsString()
    category!: string;

    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsOptional()
    @IsString()
    location?: string;
}