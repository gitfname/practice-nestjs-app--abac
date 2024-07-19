import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from "@nestjs/common"
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { plainToClass } from "class-transformer"
import { UserGetRequestParams } from "./dto/user-get-request.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserPutRequestParams } from "./dto/user-put-request-params";
import { UserDeleteRequestParams } from "./dto/user-delete-params.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { Roles } from "src/rbac/roles.decoator";
import { ERoles } from "src/rbac/user-roles.enum";

@Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @UseGuards(AuthGuard)
    @Post()
    createUser(@Body() createUserDto: CreateUserDto): UserDto {
        return plainToClass(UserDto, this.userService.createUser(createUserDto), { excludeExtraneousValues: true })
    }

    @Get()
    @Roles(ERoles.Admin, ERoles.Owner)
    @UseGuards(AuthGuard, RoleGuard)
    findAllUser(@Req() req: Request): UserDto[] {
        console.log(req["user"])
        return plainToClass(UserDto, this.userService.findAllUsers(), { excludeExtraneousValues: true })
    }

    @Get("profile")
    @UseGuards(AuthGuard)
    profile(@Req() req: Request): UserDto {
        return plainToClass(UserDto, this.userService.findOneById(req["user"]["sub"]))
    }

    @Get(":id")
    @Roles(ERoles.Owner, ERoles.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    findOneUserById(@Param() params: UserGetRequestParams): UserDto {
        return plainToClass(UserDto, this.userService.findOneById(+params.id), { excludeExtraneousValues: true })
    }

    @Put(":id")
    @Roles(ERoles.Owner, ERoles.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    updateUserById(@Body() updateUserdto: UpdateUserDto, @Param() params: UserPutRequestParams): UserDto {
        return plainToClass(UserDto, this.userService.updateUser(+params.id, updateUserdto))
    }

    @Delete(":id")
    @Roles(ERoles.Owner, ERoles.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    deleteUserById(@Param() params: UserDeleteRequestParams): void {
        this.userService.deleteUserById(+params.id)
    }
}