import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClassExam } from "../entiy/entities/ClassExam.entity";
import { Class } from "../entiy/entities/Class.entity";
import { Exam } from "../entiy/entities/Exam.entity";
import { CreateClassExamDto, PaginationDto } from "./dto/create-classExam.dto";
@Injectable()
export class ClassExamService {
  constructor(
    @InjectRepository(ClassExam)
    private readonly classExamRepository: Repository<ClassExam>,
  ) {}

  async create(createClassExamDto: CreateClassExamDto) {
    const classExam = this.classExamRepository.create(createClassExamDto);
    return await this.classExamRepository.save(classExam);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, pageSize } = paginationDto;
    const skip = (page - 1) * pageSize;

    // 获取classExam列表
    const [classExams, total] = await this.classExamRepository.findAndCount({
      skip,
      take: pageSize,
      where: { teacherId: paginationDto.teacherId },
    });
    // 获取所有classId和examId
    const classIds = classExams.map((ce) => ce.classId);
    const examIds = classExams.map((ce) => ce.examId);

    // 查询class和exam信息
    const classRepo = this.classExamRepository.manager.getRepository(Class);
    const examRepo = this.classExamRepository.manager.getRepository(Exam);

    const [classes, exams] = await Promise.all([
      classRepo.findByIds(classIds),
      examRepo.findByIds(examIds),
    ]);

    // 创建映射
    const classMap = new Map(classes.map((c) => [c.classId, c]));
    const examMap = new Map(exams.map((e) => [e.examId, e]));

    // 组合数据
    const data = classExams.map((ce) => {
      const classInfo = classMap.get(ce.classId);
      const examInfo = examMap.get(ce.examId);

      return {
        id: ce.id,
        classId: ce.classId,
        className: classInfo?.className || "",
        examId: ce.examId,
        examName: examInfo?.examName || "",
        startTime: examInfo?.startTime || null,
        endTime: examInfo?.endTime || null,
      };
    });

    return {
      data,
      total,
      page,
      pageSize,
    };
  }

  async remove(id: number) {
    return await this.classExamRepository.delete(id);
  }
}
