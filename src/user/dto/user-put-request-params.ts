import { IsNumberString, MaxLength } from "class-validator"

export class UserPutRequestParams {
    @IsNumberString({
        no_symbols: true
    })
    @MaxLength(5)
    id: string;
}