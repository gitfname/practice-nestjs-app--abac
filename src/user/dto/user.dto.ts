import { Expose, Exclude } from "class-transformer"

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    email: string;

    @Expose()
    phone: string;

    @Expose()
    isPhoneVerified: boolean

    @Expose()
    isEmailVerified: boolean;

    @Expose()
    isActive: boolean;

    @Expose()
    dateCreated: Date;

    @Expose()
    role:string;
    
    @Exclude()
    password: string;
}