import { Module } from "@nestjs/common"
import { Categoryservice } from "./category.service";
import { CategoryController } from "./category.controller";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        UserModule
    ],
    providers: [Categoryservice],
    controllers: [CategoryController],
    exports: [Categoryservice]
})
export class CategoryModule { }