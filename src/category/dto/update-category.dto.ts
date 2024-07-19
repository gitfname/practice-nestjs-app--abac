import { IsString, MaxLength, IsInt, IsOptional } from "class-validator"

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(300)
    description: string;

    @IsOptional()
    @IsInt()
    manager: number;
}