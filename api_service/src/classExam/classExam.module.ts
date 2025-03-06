import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClassExam } from "../entiy/entities/ClassExam.entity";
import { Class } from "../entiy/entities/Class.entity";
import { Exam } from "../entiy/entities/Exam.entity";
import { ClassExamService } from "./classExam.service";
import { ClassExamController } from "./classExam.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ClassExam, Class, Exam])],
  controllers: [ClassExamController],
  providers: [ClassExamService],
})
export class ClassExamModule {}
