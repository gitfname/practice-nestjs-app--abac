import { BadRequestException } from "@nestjs/common"

export class PhoneNumberAlreadyTakenException extends BadRequestException {
    constructor(message?: string) {
        super(message || "phone number already taken")
    }
}