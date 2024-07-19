import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common"
import { Request } from "express"
import { JwtService } from "@nestjs/jwt"
import { AuthConstants } from "src/auth/auth.constants"
import { UserService } from "src/user/user.service"

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const req: Request = await ctx.switchToHttp().getRequest()
        const token = req.headers.authorization?.split(" ")?.[1]

        try {
            const decodedPayload = await this.jwtService.verifyAsync(token, { secret: AuthConstants.JWT_SECRET })

            const user = await this.userService.findOneByEmail(decodedPayload.user.email)

            if (!user) {
                return false
            }

            req["user"] = {
                sub: user.id,
                email: user.email
            }

            return true
        } catch (error) {
            return false
        }
    }
}