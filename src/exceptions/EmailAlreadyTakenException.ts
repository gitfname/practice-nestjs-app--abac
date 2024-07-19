import { BadRequestException } from "@nestjs/common"

export class EmailAlreadyTakenException extends BadRequestException {
    constructor(message?: string) {
        super(message || "email address already taken")
    }
}