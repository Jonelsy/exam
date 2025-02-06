import { Module } from "@nestjs/common";
import { ClassController } from "./class.controller";
import { ClassService } from "./class.service";
import { Class } from "../entiy/entities/Class.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Class])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
