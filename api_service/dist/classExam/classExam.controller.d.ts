import { ClassExamService } from "./classExam.service";
import { CreateClassExamDto, PaginationDto } from "./dto/create-classExam.dto";
export declare class ClassExamController {
    private readonly classExamService;
    constructor(classExamService: ClassExamService);
    create(createClassExamDto: CreateClassExamDto): Promise<import("../entiy/entities/ClassExam.entity").ClassExam>;
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
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
