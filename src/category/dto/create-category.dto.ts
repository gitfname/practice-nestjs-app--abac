import { IsString, MaxLength, IsInt } from "class-validator"

export class CreateCategoryDto {
    @IsString()
    @MaxLength(100)
    title: string;

    @IsString()
    @MaxLength(300)
    description: string;

    @IsInt()
    manager: number;
}