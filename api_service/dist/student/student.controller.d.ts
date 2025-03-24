import { StudentService } from "./student.service";
import { getStuExamListDto } from "./dto/register-student.dto";
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    findAll(item: getStuExamListDto): Promise<{
        data: import("../entiy/entities/Exam.entity").Exam[];
        total: number;
    }>;
}
