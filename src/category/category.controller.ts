import { Controller, Get, Post, Patch, Body, Param, Delete, UseGuards } from "@nestjs/common"
import { Categoryservice } from "./category.service";
import { CategoryEntity } from "./entity/category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { Roles } from "src/rbac/roles.decoator";
import { ERoles } from "src/rbac/user-roles.enum";

@Controller("categories")
export class CategoryController {
    constructor(
        private readonly categoryService: Categoryservice
    ) { }

    @Post()
    @Roles(ERoles.Owner)
    @UseGuards(AuthGuard, RoleGuard)
    create(@Body() createCategoryDto: CreateCategoryDto): CategoryEntity {
        return this.categoryService.create(createCategoryDto)
    }

    @Get()
    findAll(): CategoryEntity[] {
        return this.categoryService.findAll()
    }

    @Get(":id")
    findOneById(@Param() params): CategoryEntity {
        return this.categoryService.findOneById(+params.id)
    }

    @Patch(":id")
    @Roles(ERoles.Owner)
    @UseGuards(AuthGuard, RoleGuard)
    updateOneById(@Param() params, @Body() updateCategoryDto: UpdateCategoryDto): CategoryEntity {
        return this.categoryService.updateOneById(+params.id, updateCategoryDto)
    }

    @Delete(":id")
    @Roles(ERoles.Owner)
    @UseGuards(AuthGuard, RoleGuard)
    deleteOneById(@Param() params): void {
        this.categoryService.deleteOneById(+params.id)
    }
}