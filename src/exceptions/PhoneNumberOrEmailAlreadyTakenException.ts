import { BadRequestException } from "@nestjs/common"

export class PhoneNumberOrEmailAlreadyTakenException extends BadRequestException {
    constructor(message?: string) {
        super(message || "email or phone already taken")
    }
}