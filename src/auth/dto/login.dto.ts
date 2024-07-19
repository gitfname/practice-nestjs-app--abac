import { IsString, MaxLength, MinLength, IsEmail } from "class-validator"

export class LoginDto {
    @IsEmail({ host_whitelist: ["gmail.com", "email.com"] })
    @MaxLength(90)
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(14)
    password: string;
}