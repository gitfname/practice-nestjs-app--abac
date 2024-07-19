import { Injectable, BadRequestException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { UserService } from "src/user/user.service"
import { compare } from "bcrypt"
import { CreateUserDto } from "src/user/dto/create-user.dto"
import { UserEntity as User } from "src/user/user.entity"

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }

    async login(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email, false)

        if (!user) {
            throw new BadRequestException("wrong credentials")
        }

        if (await compare(password, user.password)) {
            return {
                access_token: await this.jwtService.signAsync({ user: { sub: user.id, email: user.email } })
            }
        }

        throw new BadRequestException("wrong credentials")
    }

    async signUp(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userService.createUser(createUserDto)
        return user
    }
}