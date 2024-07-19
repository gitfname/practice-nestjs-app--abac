import { Controller, Body, Param, Post, Get, Patch, Delete, UseGuards } from "@nestjs/common"
import { ProductService } from "./product.service";
import { ProductEntity } from "./entity/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { Roles } from "src/rbac/roles.decoator";
import { ERoles } from "src/rbac/user-roles.enum";
import { IsManagerOfCategory } from "src/guards/is-manager-of-category.guard";

@Controller("products")
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Post()
    @Roles(ERoles.Owner)
    @UseGuards(AuthGuard, RoleGuard)
    create(@Body() createProductDto: CreateProductDto): ProductEntity {
        return this.productService.create(createProductDto)
    }

    @Get()
    findAll(): ProductEntity[] {
        return this.productService.findAll()
    }

    @Get(":id")
    findOneById(@Param() params) {
        return this.productService.findOneById(+params.id)
    }

    @Patch(":id")
    @Roles(ERoles.Owner, ERoles.Admin)
    @UseGuards(AuthGuard, RoleGuard, IsManagerOfCategory)
    updateOneBtId(@Param() params, @Body() updateProductDto: UpdateProductDto): ProductEntity {
        return this.productService.updateOneById(+params.id, updateProductDto)
    }

    @Delete(":id")
    @Roles(ERoles.Owner, ERoles.Admin)
    @UseGuards(AuthGuard, RoleGuard, IsManagerOfCategory)
    deleteOneById(@Param() params) {
        return this.productService.delete(+params.id)
    }
}