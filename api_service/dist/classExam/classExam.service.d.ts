import { Repository } from "typeorm";
import { ClassExam } from "../entiy/entities/ClassExam.entity";
import { CreateClassExamDto, PaginationDto } from "./dto/create-classExam.dto";
export declare class ClassExamService {
    private readonly classExamRepository;
    constructor(classExamRepository: Repository<ClassExam>);
    create(createClassExamDto: CreateClassExamDto): Promise<ClassExam>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: {
            id: number;
            classId: number;
            className: string;
            examId: number;
            examName: string;
            startTime: Date;
            endTime: Date;
        }[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
