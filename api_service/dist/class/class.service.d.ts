import { Repository } from "typeorm";
import { Class } from "../entiy/entities/Class.entity";
import { User } from "../entiy/entities/User.entity";
import { UserClass } from "../entiy/entities/UserClass.entity";
import { UserClassDto } from "./dto/class.dto";
export declare class ClassService {
    private classRepository;
    private userRepository;
    private userClassRepository;
    constructor(classRepository: Repository<Class>, userRepository: Repository<User>, userClassRepository: Repository<UserClass>);
    createStudentClassRelation(teacherId: number, classId: number, userClassDto: UserClassDto): Promise<any>;
    findAll(getClassDto: any): Promise<{
        data: Class[];
        total: number;
    }>;
    findOne(id: number): Promise<Class>;
    create(classData: Partial<Class>): Promise<any>;
    update(id: number, classData: Partial<Class>): Promise<any>;
    delete(id: number): Promise<any>;
}
