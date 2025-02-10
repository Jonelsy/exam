import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Exam } from "../entiy/entities/Exam.entity";
import { ClassExam } from "../entiy/entities/ClassExam.entity";
import { CreateExamDto } from "./dto/exam.dto";

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
    @InjectRepository(ClassExam)
    private readonly classExamRepository: Repository<ClassExam>,
  ) {}

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    const exam = this.examRepository.create(createExamDto);
    return await this.examRepository.save(exam);
  }

  async findAll(query): Promise<Exam[]> {
    if (query.classId && query.teacherId) {
      throw new NotFoundException(`不可以都传`);
    }
    if (query.teacherId) {
      return await this.examRepository.find({
        where: { teacherId: query.teacherId },
      });
    }
    if (query.classId) {
      const classExamList = await this.classExamRepository.find({
        where: { classId: query.classId },
      });
      const examPromises = classExamList.map(async (classExam: any) => {
        // 根据examId查询exam表，并直接返回Exam对象
        return this.examRepository.findOneBy({ examId: classExam.examId });
      });

      // 等待所有Promise完成，并得到一个Exam对象的数组
      const exams = await Promise.all(examPromises);

      // 返回Exam对象的数组
      return exams;
    }

    throw new NotFoundException(`传递Id有误`);
  }

  async findOne(id: number): Promise<Exam> {
    const exam = await this.examRepository.findOne({ where: { examId: id } });
    if (!exam) {
      throw new NotFoundException(`${id} 没有找到`);
    }
    return exam;
  }

  async update(id: number, updateExamDto: CreateExamDto): Promise<Exam> {
    const exam = await this.findOne(id);
    const newExam = Object.assign(exam, updateExamDto);
    return await this.examRepository.save(newExam);
  }

  async remove(id: number): Promise<void> {
    const result = await this.examRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(` ${id} 不存在`);
    }
  }

  async bindExamToClass(examId: number, classId: number): Promise<ClassExam> {
    // 检查考试是否存在
    const exam = await this.examRepository.findOne({ where: { examId } });
    if (!exam) {
      throw new NotFoundException(`考试 ${examId} 不存在`);
    }

    // 创建新的ClassExam关系
    const classExam = this.classExamRepository.create({
      examId,
      classId,
    });

    return await this.classExamRepository.save(classExam);
  }
}
