import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt"
import { AuthConstants } from "./auth.constants";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: AuthConstants.JWT_SECRET,
            global: true,
            signOptions: {
                expiresIn: "10d"
            }
        })
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }
