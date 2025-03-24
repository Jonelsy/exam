import { Repository } from "typeorm";
import { User } from "../entiy/entities/User.entity";
import { UserClass } from "src/entiy/entities/UserClass.entity";
import { ClassExam } from "src/entiy/entities/ClassExam.entity";
import { Exam } from "src/entiy/entities/Exam.entity";
import { getStuExamListDto } from "./dto/register-student.dto";
export declare class StudentService {
    private userRepository;
    private userClassRepository;
    private classExamRepository;
    private examRepository;
    constructor(userRepository: Repository<User>, userClassRepository: Repository<UserClass>, classExamRepository: Repository<ClassExam>, examRepository: Repository<Exam>);
    findAllExamList(item: getStuExamListDto): Promise<{
        data: Exam[];
        total: number;
    }>;
}
