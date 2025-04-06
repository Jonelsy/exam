import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entiy/entities/User.entity";
import { UserClass } from "src/entiy/entities/UserClass.entity";
import { ClassExam } from "src/entiy/entities/ClassExam.entity";
import { Exam } from "src/entiy/entities/Exam.entity";
import { SubmissionAnswers } from "src/entiy/entities/SubmissionAnswers.entity";
import { getStuExamListDto, subExamDto } from "./dto/register-student.dto";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserClass)
    private userClassRepository: Repository<UserClass>,
    @InjectRepository(ClassExam)
    private classExamRepository: Repository<ClassExam>,
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
    @InjectRepository(SubmissionAnswers)
    private submissionAnswersRepository: Repository<SubmissionAnswers>,
  ) {}

  async findAllExamList(
    item: getStuExamListDto,
  ): Promise<{ data: Exam[]; total: number }> {
    // 1. 通过userid寻找examid
    const userClass = await this.userClassRepository.findOne({
      where: { userId: item.userId },
      select: ["classId"],
    });

    if (!userClass) {
      throw new HttpException("未找到该用户的班级信息", HttpStatus.NOT_FOUND);
    }

    // 2. 通过examid寻找classid
    const classExams = await this.classExamRepository.find({
      where: { classId: userClass.classId },
      select: ["examId"],
    });

    if (!classExams.length) {
      return { data: [], total: 0 };
    }

    const examIds = classExams.map((ce) => ce.examId);

    // 3. 去获取所有exams
    const query = this.examRepository
      .createQueryBuilder("exam")
      .where("exam_id IN (:...examIds)", { examIds })
      .skip((item.page - 1) * item.pageSize)
      .take(item.pageSize);

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  async subExamList(item: subExamDto) {
    // 使用事务确保操作原子性
    const queryRunner =
      this.submissionAnswersRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 先删除相同examId的所有记录
      await queryRunner.manager.delete(SubmissionAnswers, {
        examId: item.examId,
      });
      // 保存新的答案记录
      for (const answer of item.answers) {
        const submission = new SubmissionAnswers();
        submission.questionId = answer.questionId;
        submission.questionType = answer.questionType;
        submission.examId = item.examId;
        submission.createdAt = new Date();
        // 根据题型设置不同的字段
        switch (answer.questionType) {
          case 0: // 单选题
            submission.answerContent = answer.optionId?.toString() || "";
            break;
          case 2: // 判断题
            submission.answerContent = answer.userAnswer?.toString() || "";
            break;
          case 1: // 多选题
            submission.optionIds = answer.optionIds?.join(",") || "";
            break;
          case 3: // 简答题
            submission.answerContent = answer.answer || "";
            break;
        }

        await queryRunner.manager.save(submission);
      }

      await queryRunner.commitTransaction();
      return { success: true, message: "提交成功" };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error("Submission error:", error);
      throw new HttpException("提交失败", HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }
}
