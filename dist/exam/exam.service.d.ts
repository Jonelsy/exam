import { Repository } from "typeorm";
import { Exam } from "../entiy/entities/Exam.entity";
import { ClassExam } from "../entiy/entities/ClassExam.entity";
import { CreateExamDto } from "./dto/exam.dto";
export declare class ExamService {
    private readonly examRepository;
    private readonly classExamRepository;
    constructor(examRepository: Repository<Exam>, classExamRepository: Repository<ClassExam>);
    create(createExamDto: CreateExamDto): Promise<Exam>;
    findAll(query: any): Promise<Exam[]>;
    findOne(id: number): Promise<Exam>;
    update(id: number, updateExamDto: CreateExamDto): Promise<Exam>;
    remove(id: number): Promise<void>;
    bindExamToClass(examId: number, classId: number): Promise<ClassExam>;
}
