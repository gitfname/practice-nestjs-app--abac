import { IsString, IsEmail, Matches, MaxLength, MinLength, IsOptional } from "class-validator"

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(90)
    @Matches(/^[A-Za-z0-9 _]*$/, {
        message: 'The string must contain only alphabets, numbers, spaces, and underscores.',
    })
    firstName: string;

    @IsOptional()
    @IsString()
    @MaxLength(90)
    @Matches(/^[A-Za-z0-9 _]*$/, {
        message: 'The string must contain only alphabets, numbers, spaces, and underscores.',
    })
    lastName: string;

    @IsOptional()
    @IsEmail({ host_whitelist: ["gmail.com", "email.com"] })
    @MaxLength(90)
    email: string;

    @IsOptional()
    @IsString()
    @MaxLength(11)
    @MinLength(11)
    phone: string;
}