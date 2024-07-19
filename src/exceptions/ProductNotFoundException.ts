import { NotFoundException } from "@nestjs/common/exceptions";

export class ProductNotFoundException extends NotFoundException {
    constructor(message?: string) {
        super(message || "product not found")
    }
}