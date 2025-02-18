import { ClassService } from "./class.service";
import { CreateClassDto, UpdateClassDto, UserClassDto, getClassDto } from "./dto/class.dto";
export declare class ClassController {
    private readonly classService;
    constructor(classService: ClassService);
    create(createClassDto: CreateClassDto): Promise<any>;
    findAll(item: getClassDto): Promise<{
        data: import("../entiy/entities/Class.entity").Class[];
        total: number;
    }>;
    findOne(id: string): Promise<import("../entiy/entities/Class.entity").Class>;
    update(id: string, updateClassDto: UpdateClassDto): Promise<any>;
    remove(id: string): Promise<any>;
    createStudentClassRelation(teacherId: number, classId: number, userClassDto: UserClassDto): Promise<any>;
}
