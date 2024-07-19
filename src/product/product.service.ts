import { Injectable } from "@nestjs/common"
import { ProductEntity } from "./entity/product.entity"
import { CreateProductDto } from "./dto/create-product.dto"
import { ProductNotFoundException } from "src/exceptions/ProductNotFoundException"
import { UpdateProductDto } from "./dto/update-product.dto"
import { Categoryservice } from "src/category/category.service"

@Injectable()
export class ProductService {
    private products: ProductEntity[] = [
        {
            "id": 1,
            "title": "product 1",
            "description": "hello world",
            "price": 103000,
            "category": 3
        },
        {
            "id": 2,
            "title": "product 2",
            "description": "hello world",
            "price": 103000,
            "category": 3
        },
        {
            "id": 3,
            "title": "product 3",
            "description": "hello world",
            "price": 103000,
            "category": 3
        },
        {
            "id": 4,
            "title": "product 4",
            "description": "hello world",
            "price": 103000,
            "category": 4
        },
        {
            "id": 5,
            "title": "product 5",
            "description": "hello world",
            "price": 103000,
            "category": 1
        },
        {
            "id": 6,
            "title": "product 6",
            "description": "hello world",
            "price": 103000,
            "category": 2
        },
        {
            "id": 7,
            "title": "product 7",
            "description": "hello world",
            "price": 103000,
            "category": 1
        }
    ]
    private latestProductId = this.products.length

    constructor(
        private readonly categoryService: Categoryservice
    ) { }

    create(createProductDto: CreateProductDto): ProductEntity {
        const product: ProductEntity = {
            id: this.latestProductId += 1,
            ...createProductDto,
            category: this.categoryService.findOneById(createProductDto.category).id
        }

        this.products.push(product)

        return product
    }

    findAll(): ProductEntity[] {
        return this.products
    }

    findOneById(id: number): ProductEntity {
        const product = this.products.find(product => product.id === id)
        if (!product) throw new ProductNotFoundException()
        return product
    }

    updateOneById(id: number, updateProductDto: UpdateProductDto): ProductEntity {
        const updatedProduct = {
            ...this.findOneById(id),
            ...updateProductDto
        }

        if (updateProductDto.category) {
            updatedProduct.category = this.categoryService.findOneById(updateProductDto.category).id
        }

        this.products = this.products.map(product => product.id !== id ? product : updatedProduct)

        return updatedProduct
    }

    delete(id: number): ProductEntity {
        const product = this.findOneById(id)
        this.products = this.products.filter(prod => prod.id !== product.id)
        return product
    }
}