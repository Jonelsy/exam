import { Module } from "@nestjs/common";
import { ClassController } from "./class.controller";
import { ClassService } from "./class.service";
import { Class } from "../entiy/entities/Class.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entiy/entities/User.entity";
import { UserClass } from "src/entiy/entities/UserClass.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Class, User, UserClass])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
