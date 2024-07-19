
import { ERoles } from "src/rbac/user-roles.enum";
export class UserEntity {
    id: number;

    email: string;

    phone: string;

    role: ERoles;

    password: string;
}