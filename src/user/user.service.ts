import { Injectable } from "@nestjs/common"
import { UserEntity as User, UserEntity } from "./user.entity"
import { CreateUserDto } from "./dto/create-user.dto"
import { ERoles } from "src/rbac/user-roles.enum"
import { hash } from "bcrypt"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UserNotFoundException } from "src/exceptions/UserNotFoundException"
import { PhoneNumberOrEmailAlreadyTakenException } from "src/exceptions/PhoneNumberOrEmailAlreadyTakenException"

@Injectable()
export class UserService {
    private users: UserEntity[] = [
        {
            "id": 1,
            "email": "owner@gmail.com",
            "phone": "09765432123",
            "role": ERoles.Owner,
            "password": "$2b$10$JeOXOeKaZyPHhX78eN8Xbu5r4vGsoWyyXwbJu4mE5i5Jez3ByPfOq" // 123456789
        },
        {
            "id": 2,
            "email": "admin1@gmail.com",
            "phone": "09876543212",
            "role": ERoles.Admin,
            "password": "$2b$10$8BD1MabLrHEThnpZ4cE5zOUzAbNAQksLw6PddA0rbjT6LNFUixvhC" // 123456789
        },
        {
            "id": 3,
            "email": "admin2@gmail.com",
            "phone": "09876543213",
            "role": ERoles.Admin,
            "password": "$2b$10$INgRXrjm7JQIYGax71CHFumnICGFIgJw7uJq444RxIiriASClItnm" // 123456789
        },
        {
            "id": 4,
            "email": "user1@gmail.com",
            "phone": "09876543212",
            "role": ERoles.User,
            "password": "$2b$10$8BD1MabLrHEThnpZ4cE5zOUzAbNAQksLw6PddA0rbjT6LNFUixvhC" // 123456789
        },
    ]

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const isUserAlreadyExist = this.users.filter(user => user.email === createUserDto.email || user.phone === createUserDto.phone)

        if (isUserAlreadyExist?.length > 0) {
            throw new PhoneNumberOrEmailAlreadyTakenException()
        }

        const latestUser = this.users[this.users.length - 1]

        const user = new User()

        user.id = latestUser.id + 1
        user.email = createUserDto.email
        user.phone = createUserDto.phone
        user.role = ERoles.User
        user.password = await hash(createUserDto.password, 10)

        this.users.push(user)

        return user
    }

    findAllUsers(): User[] {
        return this.users
    }

    findOneById(id: number): User {
        const user = this.users.find(user => user.id === id)
        if (!user) throw new UserNotFoundException()
        return user
    }

    findOneByEmail(email: string, checkAvailable: boolean = false): User {
        const user = this.users.find(user => user.email === email)
        if (checkAvailable) {
            if (!user) throw new UserNotFoundException()
        }
        return user
    }

    updateUser(id: number, updateUserDto: UpdateUserDto): User {
        const targetUser = this.findOneById(id)

        if (updateUserDto.email) {
            targetUser.email = updateUserDto.email
        }
        if (updateUserDto.phone) {
            targetUser.phone = updateUserDto.phone
        }

        this.users = this.users.map(user => user.id !== id ? user : targetUser)

        return targetUser
    }

    deleteUserById(id: number): void {
        const targetUser = this.findOneById(id)
        this.users = this.users.filter(user => user.id !== targetUser.id)
    }
}
