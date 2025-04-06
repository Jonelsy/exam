import { Repository } from "typeorm";
import { User } from "../entiy/entities/User.entity";
import { UserClass } from "src/entiy/entities/UserClass.entity";
import { ClassExam } from "src/entiy/entities/ClassExam.entity";
import { Exam } from "src/entiy/entities/Exam.entity";
import { SubmissionAnswers } from "src/entiy/entities/SubmissionAnswers.entity";
import { getStuExamListDto, subExamDto } from "./dto/register-student.dto";
export declare class StudentService {
    private userRepository;
    private userClassRepository;
    private classExamRepository;
    private examRepository;
    private submissionAnswersRepository;
    constructor(userRepository: Repository<User>, userClassRepository: Repository<UserClass>, classExamRepository: Repository<ClassExam>, examRepository: Repository<Exam>, submissionAnswersRepository: Repository<SubmissionAnswers>);
    findAllExamList(item: getStuExamListDto): Promise<{
        data: Exam[];
        total: number;
    }>;
    subExamList(item: subExamDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
