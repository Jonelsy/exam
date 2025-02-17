import { ExamRecord } from "../entiy/entities/ExamRecord.entity";
import { CreateExamRecordDto } from "./dto/exam-record.dto";
import { Repository } from "typeorm";
import { Exam } from "../entiy/entities/Exam.entity";
import { ClassExam } from "../entiy/entities/ClassExam.entity";
import { Question } from "../entiy/entities/Question.entity";
import { Option } from "../entiy/entities/Option.entity";
import { CreateExamDto } from "./dto/exam.dto";
import { CreateQuestionDto, UpdateQuestionDto } from "./dto/question.dto";
import { CreateOptionDto, UpdateOptionDto } from "./dto/option.dto";
export declare class ExamService {
    private readonly examRepository;
    private readonly classExamRepository;
    private readonly questionRepository;
    private readonly optionRepository;
    private readonly examRecordRepository;
    constructor(examRepository: Repository<Exam>, classExamRepository: Repository<ClassExam>, questionRepository: Repository<Question>, optionRepository: Repository<Option>, examRecordRepository: Repository<ExamRecord>);
    create(createExamDto: CreateExamDto): Promise<Exam>;
    findAll(query: any): Promise<Exam[]>;
    findOne(id: number): Promise<Exam>;
    update(id: number, updateExamDto: CreateExamDto): Promise<Exam>;
    remove(id: number): Promise<void>;
    createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question>;
    findAllQuestions(examId: number, page: number, pageSize: number): Promise<{
        questions: Question[];
        total: number;
        totalPages: number;
    }>;
    findOneQuestion(id: number): Promise<Question>;
    updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question>;
    removeQuestion(id: number): Promise<void>;
    createOption(createOptionDto: CreateOptionDto): Promise<Option>;
    getOptionById(id: number): Promise<Option>;
    updateOption(id: number, updateOptionDto: UpdateOptionDto): Promise<Option>;
    deleteOption(id: number): Promise<void>;
    createExamRecord(createExamRecordDto: CreateExamRecordDto): Promise<ExamRecord>;
    bindExamToClass(examId: number, classId: number): Promise<ClassExam>;
}
