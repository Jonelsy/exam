import { Module } from "@nestjs/common";
import { ExamController } from "./exam.controller";
import { ExamService } from "./exam.service";
import { Exam } from "../entiy/entities/Exam.entity";
import { ClassExam } from "../entiy/entities/ClassExam.entity";
import { Question } from "src/entiy/entities/Question.entity";
import { Option } from "src/entiy/entities/Option.entity";
import { ExamRecord } from "src/entiy/entities/ExamRecord.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [ExamController],
  providers: [ExamService],
  imports: [
    TypeOrmModule.forFeature([Exam, ClassExam, Question, Option, ExamRecord]),
  ],
})
export class ExamModule {}
