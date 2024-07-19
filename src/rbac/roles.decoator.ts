import { SetMetadata } from "@nestjs/common"
import { ERoles } from "./user-roles.enum"

export const ROLES_KEY = "roles"
export const Roles = (...roles: ERoles[]) => SetMetadata(ROLES_KEY, roles)