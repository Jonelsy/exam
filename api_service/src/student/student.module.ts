import { Module } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entiy/entities/User.entity";
import { UserClass } from "src/entiy/entities/UserClass.entity";
import { ClassExam } from "src/entiy/entities/ClassExam.entity";
import { Exam } from "src/entiy/entities/Exam.entity";
import { SubmissionAnswers } from "src/entiy/entities/SubmissionAnswers.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../auth/jwt.strategy";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    TypeOrmModule.forFeature([
      User,
      UserClass,
      ClassExam,
      Exam,
      SubmissionAnswers,
    ]),
  ],
  providers: [StudentService, JwtStrategy],
  controllers: [StudentController],
})
export class StudentModule {}
