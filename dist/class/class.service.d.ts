import { Repository } from "typeorm";
import { Class } from "../entiy/entities/Class.entity";
export declare class ClassService {
    private classRepository;
    constructor(classRepository: Repository<Class>);
    findAll(): Promise<Class[]>;
    findOne(id: number): Promise<Class>;
    create(classData: Partial<Class>): Promise<Class>;
    update(id: number, classData: Partial<Class>): Promise<any>;
    delete(id: number): Promise<any>;
}
