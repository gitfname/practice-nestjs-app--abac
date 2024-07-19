import { CanActivate, ExecutionContext, NotFoundException, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Request } from "express"
import { ERoles } from "src/rbac/user-roles.enum"
import { UserService } from "src/user/user.service"

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly userService: UserService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<ERoles[]>("roles", context.getHandler())

        if (!requiredRoles) {
            return true
        }

        const req: Request = context.switchToHttp().getRequest()
        const userId = req["user"]["sub"]

        const user = await this.userService.findOneById(userId)

        return requiredRoles.some(role => user.role.includes(role))
    }
}