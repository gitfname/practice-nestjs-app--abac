import { IsString, MaxLength, IsInt } from "class-validator"

export class CreateProductDto {
    @IsString()
    @MaxLength(120)
    title: string;

    @IsString()
    @MaxLength(400)
    description: string;

    @IsInt()
    price: number;

    @IsInt()
    category: number;
}