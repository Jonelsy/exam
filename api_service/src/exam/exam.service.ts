import { Injectable, NotFoundException } from "@nestjs/common";
import { ExamRecord } from "../entiy/entities/ExamRecord.entity";
import { CreateExamRecordDto } from "./dto/exam-record.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Exam } from "../entiy/entities/Exam.entity";
import { ClassExam } from "../entiy/entities/ClassExam.entity";
import { Question } from "../entiy/entities/Question.entity";
import { Option } from "../entiy/entities/Option.entity";
import { CreateExamDto, UpdateExamDto } from "./dto/exam.dto";
import { CreateQuestionDto, UpdateQuestionDto } from "./dto/question.dto";
import { CreateOptionDto, UpdateOptionDto } from "./dto/option.dto";

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
    @InjectRepository(ClassExam)
    private readonly classExamRepository: Repository<ClassExam>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(ExamRecord)
    private readonly examRecordRepository: Repository<ExamRecord>,
  ) {}
  //创建考试
  async create(createExamDto: CreateExamDto): Promise<Exam> {
    const exam = this.examRepository.create(createExamDto);
    return await this.examRepository.save(exam);
  }
  //查询考试列表
  async findAll(query: {
    classId?: number;
    teacherId?: number;
    page: number;
    pageSize: number;
    search?: string;
  }): Promise<{ exams: Exam[]; total: number; totalPages: number }> {
    const { classId, teacherId, page = 1, pageSize = 10 } = query;

    if (classId && teacherId) {
      throw new NotFoundException(`不可以都传`);
    }

    if (teacherId) {
      const [exams, total] = await this.examRepository.findAndCount({
        where: { teacherId },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
      const totalPages = Math.ceil(total / pageSize);
      return { exams, total, totalPages };
    }

    if (classId) {
      // eslint-disable-next-line prettier/prettier
      const [classExamList, total] = await this.classExamRepository.findAndCount({
          where: { classId },
          skip: (page - 1) * pageSize,
          take: pageSize,
        });

      const examPromises = classExamList.map(async (classExam: any) => {
        return this.examRepository.findOneBy({ examId: classExam.examId });
      });

      const exams = await Promise.all(examPromises);
      const totalPages = Math.ceil(total / pageSize);
      return { exams, total, totalPages };
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
  async update(updateExamDto: UpdateExamDto): Promise<Exam> {
    const exam = await this.findOne(updateExamDto.examId);
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

    // 获取所有题目的ID，这段代码够学一个月的
    const questionIds = result.map((question) => question.questionId);

    // 查询这些题目对应的options
    const options = await this.optionRepository.find({
      where: { questionId: In(questionIds) },
    });

    // 将options按questionId分组
    const optionsMap = options.reduce((map, option) => {
      if (!map[option.questionId]) {
        map[option.questionId] = [];
      }
      map[option.questionId].push(option);
      return map;
    }, {});

    // 将options数组添加到对应的question对象中
    const questionsWithOptions = result.map((question) => ({
      ...question,
      options: optionsMap[question.questionId] || [],
    }));

    const totalPages = Math.ceil(count / pageSize);
    return { questions: questionsWithOptions, total: count, totalPages };
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

  // 触发删除题目与答案
  async removeQuestionOptions(id: number): Promise<void> {
    console.log(id);

    const optionResult = await this.optionRepository.delete({ examId: id });
    if (optionResult.affected === 0) {
      throw new NotFoundException(`考试 ${id} 的选项不存在`);
    }
    const questionResult = await this.questionRepository.delete({ examId: id });
    if (questionResult.affected === 0) {
      throw new NotFoundException(`考试 ${id} 的题目不存在`);
    }
  }

  // 创建选项
  async createOption(createOptionDto: CreateOptionDto): Promise<Option> {
    // 获取对应的question
    const question = await this.questionRepository.findOne({
      where: { questionId: createOptionDto.questionId },
    });

    if (!question) {
      throw new NotFoundException(`题目 ${createOptionDto.questionId} 不存在`);
    }

    // 如果是单选题（question_type为0）
    if (question.questionType === 0) {
      // 查询该题目的所有选项
      const options = await this.optionRepository.find({
        where: { questionId: createOptionDto.questionId },
      });

      // 检查是否已经存在正确答案
      const hasCorrectAnswer = options.some((option) => option.isCorrect);
      if (hasCorrectAnswer && createOptionDto.isCorrect) {
        throw new NotFoundException("单选题只能有一个正确答案");
      }
    }

    const option = this.optionRepository.create(createOptionDto);
    return await this.optionRepository.save(option);
  }

  // 获取选项
  async getOptionById(id: number): Promise<Option> {
    const option = await this.optionRepository.findOne({
      where: { optionId: id },
    });
    if (!option) {
      throw new NotFoundException(`选项 ${id} 不存在`);
    }
    return option;
  }

  // 更新选项
  async updateOption(
    id: number,
    updateOptionDto: UpdateOptionDto,
  ): Promise<Option> {
    const option = await this.getOptionById(id);
    const updatedOption = Object.assign(option, updateOptionDto);
    return await this.optionRepository.save(updatedOption);
  }

  // 删除选项
  async deleteOption(id: number): Promise<void> {
    const result = await this.optionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`选项 ${id} 不存在`);
    }
  }

  // 创建考试记录
  async createExamRecord(
    createExamRecordDto: CreateExamRecordDto,
  ): Promise<ExamRecord> {
    const examRecord = this.examRecordRepository.create(createExamRecordDto);
    return await this.examRecordRepository.save(examRecord);
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
