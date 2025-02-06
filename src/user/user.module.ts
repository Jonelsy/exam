import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entiy/entities/User.entity";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../auth/jwt.strategy";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: "jonelsy",
      signOptions: { expiresIn: "1h" },
    }),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
