import { IsString, MaxLength, IsInt, IsOptional } from "class-validator"

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    @MaxLength(120)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(400)
    description: string;

    @IsOptional()
    @IsInt()
    price: number;

    @IsOptional()
    @IsInt()
    category: number;
}