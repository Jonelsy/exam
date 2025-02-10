import { ExamService } from "./exam.service";
import { CreateExamDto } from "./dto/exam.dto";
import { findExamDto } from "./dto/exam.dto";
export declare class ExamController {
    private readonly examService;
    constructor(examService: ExamService);
    create(createExamDto: CreateExamDto): Promise<import("../entiy/entities/Exam.entity").Exam>;
    bindExamToClass(examId: string, classId: string): Promise<import("../entiy/entities/ClassExam.entity").ClassExam>;
    findAll(query: findExamDto): Promise<import("../entiy/entities/Exam.entity").Exam[]>;
    findOne(id: string): Promise<import("../entiy/entities/Exam.entity").Exam>;
    update(id: string, updateExamDto: CreateExamDto): Promise<import("../entiy/entities/Exam.entity").Exam>;
    remove(id: string): Promise<void>;
}
