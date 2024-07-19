import { Module } from "@nestjs/common"
import { UserModule } from "src/user/user.module";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { CategoryModule } from "src/category/category.module";

@Module({
    imports: [
        UserModule, CategoryModule
    ],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule { }