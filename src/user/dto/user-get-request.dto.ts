import { IsNumberString, MaxLength } from "class-validator"

export class UserGetRequestParams {
    @IsNumberString({
        no_symbols: true
    })
    @MaxLength(5)
    id: string;
}