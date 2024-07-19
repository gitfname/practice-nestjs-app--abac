import { IsString, IsEmail, IsStrongPassword, Matches, MaxLength, Length, MinLength } from "class-validator"

export class CreateUserDto {
    @IsEmail({ host_whitelist: ["gmail.com", "email.com"] })
    @MaxLength(90)
    email: string;

    @IsString()
    @Length(11)
    phone: string;

    @IsString()
    @MaxLength(14)
    @MinLength(6)
    password: string;
}