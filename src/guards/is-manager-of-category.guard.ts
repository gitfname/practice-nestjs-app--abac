import { ExecutionContext, CanActivate, Injectable } from "@nestjs/common"
import { Categoryservice } from "src/category/category.service"
import { type Request } from "express"
import { UserService } from "src/user/user.service"
import { ERoles } from "src/rbac/user-roles.enum"
import { ProductService } from "src/product/product.service"

@Injectable()
export class IsManagerOfCategory implements CanActivate {
    constructor(
        private readonly categoryService: Categoryservice,
        private readonly productService: ProductService,
        private readonly userService: UserService
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const req: Request = context.switchToHttp().getRequest()
        const userId = req["user"]["sub"]
        const user = this.userService.findOneById(userId)
        const productId = req.params.id

        const category = this.categoryService.findOneById(this.productService.findOneById(+productId).category)

        if (user.role === ERoles.Owner) return true

        if (category.manager !== user.id) {
            return false
        }

        return true
    }
}