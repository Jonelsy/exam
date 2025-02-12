import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Exam } from "../entiy/entities/Exam.entity";
import { ClassExam } from "../entiy/entities/ClassExam.entity";
import { Question } from "../entiy/entities/Question.entity";
import { CreateExamDto } from "./dto/exam.dto";
import { CreateQuestionDto, UpdateQuestionDto } from "./dto/question.dto";

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
    @InjectRepository(ClassExam)
    private readonly classExamRepository: Repository<ClassExam>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}
  //创建考试
  async create(createExamDto: CreateExamDto): Promise<Exam> {
    const exam = this.examRepository.create(createExamDto);
    return await this.examRepository.save(exam);
  }
  //查询考试列表
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
  //查询考试详细信息
  async findOne(id: number): Promise<Exam> {
    const exam = await this.examRepository.findOne({ where: { examId: id } });
    if (!exam) {
      throw new NotFoundException(`${id} 没有找到`);
    }
    return exam;
  }
  //更新考试详细信息
  async update(id: number, updateExamDto: CreateExamDto): Promise<Exam> {
    const exam = await this.findOne(id);
    const newExam = Object.assign(exam, updateExamDto);
    return await this.examRepository.save(newExam);
  }
  //删除考试详细信息
  async remove(id: number): Promise<void> {
    const result = await this.examRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(` ${id} 不存在`);
    }
  }

  // 创建题目
  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const question = this.questionRepository.create(createQuestionDto);
    return await this.questionRepository.save(question);
  }

  // 查询所有题目
  async findAllQuestions(
    examId: number,
    page: number,
    pageSize: number,
  ): Promise<{ questions: Question[]; total: number; totalPages: number }> {
    const [result, count] = await this.questionRepository.findAndCount({
      where: { examId },
      order: { orderNum: "ASC" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const totalPages = Math.ceil(count / pageSize);
    return { questions: result, total: count, totalPages };
  }

  // 查询单个题目
  async findOneQuestion(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { questionId: id },
    });
    if (!question) {
      throw new NotFoundException(`题目 ${id} 不存在`);
    }
    return question;
  }

  // 更新题目
  async updateQuestion(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const question = await this.findOneQuestion(id);
    const updatedQuestion = Object.assign(question, updateQuestionDto);
    return await this.questionRepository.save(updatedQuestion);
  }

  // 删除题目
  async removeQuestion(id: number): Promise<void> {
    const result = await this.questionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`题目 ${id} 不存在`);
    }
  }
  //班级绑定考试
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
