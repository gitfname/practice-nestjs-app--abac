import { Controller, Post, Body } from "@nestjs/common"
import { LoginResponseDto } from "./dto/login-response.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserDto } from "src/user/dto/user.dto";
import { plainToClass } from "class-transformer"

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("login")
    async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
        return await this.authService.login(loginDto.email, loginDto.password)
    }

    @Post("signup")
    async signUp(@Body() createUSerDto: CreateUserDto): Promise<UserDto> {
        return plainToClass(UserDto, await this.authService.signUp(createUSerDto), { excludeExtraneousValues: true })
    }
}