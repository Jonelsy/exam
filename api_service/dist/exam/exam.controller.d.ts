import { CreateExamRecordDto } from "./dto/exam-record.dto";
import { ExamService } from "./exam.service";
import { CreateExamDto, findExamDto, UpdateExamDto } from "./dto/exam.dto";
import { CreateQuestionDto, UpdateQuestionDto } from "./dto/question.dto";
import { CreateOptionDto, UpdateOptionDto } from "./dto/option.dto";
export declare class ExamController {
    private readonly examService;
    constructor(examService: ExamService);
    create(createExamDto: CreateExamDto): Promise<import("../entiy/entities/Exam.entity").Exam>;
    bindExamToClass(examId: string, classId: string): Promise<import("../entiy/entities/ClassExam.entity").ClassExam>;
    findAll(query: findExamDto): Promise<{
        exams: import("../entiy/entities/Exam.entity").Exam[];
        total: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("../entiy/entities/Exam.entity").Exam>;
    update(updateExamDto: UpdateExamDto): Promise<import("../entiy/entities/Exam.entity").Exam>;
    remove(id: string): Promise<void>;
    createQuestion(createQuestionDto: CreateQuestionDto): Promise<import("../entiy/entities/Question.entity").Question>;
    getQuestionsByExam(examId: string, Page: number, PageSize: number): Promise<{
        questions: import("../entiy/entities/Question.entity").Question[];
        total: number;
        totalPages: number;
    }>;
    getQuestion(id: string): Promise<import("../entiy/entities/Question.entity").Question>;
    updateQuestion(id: string, updateQuestionDto: UpdateQuestionDto): Promise<import("../entiy/entities/Question.entity").Question>;
    deleteQuestion(id: string): Promise<void>;
    createOption(createOptionDto: CreateOptionDto): Promise<import("../entiy/entities/Option.entity").Option>;
    getOption(id: string): Promise<import("../entiy/entities/Option.entity").Option>;
    updateOption(id: string, updateOptionDto: UpdateOptionDto): Promise<import("../entiy/entities/Option.entity").Option>;
    deleteOption(id: string): Promise<void>;
    createExamRecord(createExamRecordDto: CreateExamRecordDto): Promise<import("../entiy/entities/ExamRecord.entity").ExamRecord>;
}
