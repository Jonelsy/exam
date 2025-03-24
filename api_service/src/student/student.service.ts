import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entiy/entities/User.entity";
import { UserClass } from "src/entiy/entities/UserClass.entity";
import { ClassExam } from "src/entiy/entities/ClassExam.entity";
import { Exam } from "src/entiy/entities/Exam.entity";
import { getStuExamListDto } from "./dto/register-student.dto";

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
}
