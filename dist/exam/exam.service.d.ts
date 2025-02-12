import { Repository } from "typeorm";
import { Exam } from "../entiy/entities/Exam.entity";
import { ClassExam } from "../entiy/entities/ClassExam.entity";
import { Question } from "../entiy/entities/Question.entity";
import { CreateExamDto } from "./dto/exam.dto";
import { CreateQuestionDto, UpdateQuestionDto } from "./dto/question.dto";
export declare class ExamService {
    private readonly examRepository;
    private readonly classExamRepository;
    private readonly questionRepository;
    constructor(examRepository: Repository<Exam>, classExamRepository: Repository<ClassExam>, questionRepository: Repository<Question>);
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
    bindExamToClass(examId: number, classId: number): Promise<ClassExam>;
}
