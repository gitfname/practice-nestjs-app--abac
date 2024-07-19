import { Injectable } from "@nestjs/common"
import { CategoryEntity } from "./entity/category.entity"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { CategoryNotFoundException } from "src/exceptions/CategoryNotFoundException"
import { UpdateCategoryDto } from "./dto/update-category.dto"
import { UserService } from "src/user/user.service"

@Injectable()
export class Categoryservice {
    private categories: CategoryEntity[] = [
        {
            "id": 1,
            "title": "category 1 ( admin 1 )",
            "description": "hello world",
            "manager": 2
        },
        {
            "id": 2,
            "title": "category 2 ( admin 1 )",
            "description": "hello world",
            "manager": 2
        },
        {
            "id": 3,
            "title": "category 3 ( admin 2 )",
            "description": "hello world",
            "manager": 3
        },
        {
            "id": 4,
            "title": "category 4 ( admin 2 )",
            "description": "hello world",
            "manager": 3
        }
    ]

    constructor(
        private readonly userService: UserService
    ) { }

    create(createCategoryDto: CreateCategoryDto): CategoryEntity {
        const latestCategory = this.categories[this.categories.length]

        const manager = this.userService.findOneById(createCategoryDto.manager)

        const category = {
            id: latestCategory?.id + 1 || 1,
            ...createCategoryDto,
            manager: manager.id
        }

        this.categories.push(category)
        return category
    }

    findAll(): CategoryEntity[] {
        return this.categories
    }

    findOneById(id: number): CategoryEntity {
        const category = this.categories.find(category => category.id === id)
        if (!category) throw new CategoryNotFoundException()
        return category
    }

    updateOneById(id: number, updateCategoryDto: UpdateCategoryDto): CategoryEntity {
        const targetCategory = this.findOneById(id)

        if (updateCategoryDto.title) targetCategory.title = updateCategoryDto.title
        if (updateCategoryDto.description) targetCategory.description = updateCategoryDto.description
        if (updateCategoryDto.manager) targetCategory.manager = this.userService.findOneById(updateCategoryDto.manager).id

        this.categories = this.categories.map(category => category.id !== targetCategory.id ? category : targetCategory)

        return targetCategory
    }

    deleteOneById(id: number): void {
        this.categories = this.categories.filter(category => category.id !== id)
    }
}