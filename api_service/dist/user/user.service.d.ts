import { Repository } from "typeorm";
import { User } from "../entiy/entities/User.entity";
import { UserClass } from "src/entiy/entities/UserClass.entity";
import { RegisterUserDto } from "./dto/register-user.dto";
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private userRepository;
    private userClassRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, userClassRepository: Repository<UserClass>, jwtService: JwtService);
    register(registerUserDto: RegisterUserDto): Promise<{
        item: User;
    }>;
    login(username: string, password: string): Promise<{
        token: string;
        payload: {
            username: string;
            userId: number;
            role: number;
        };
        code: number;
    }>;
    findAll(item: {
        classId?: number;
        page: number;
        pageSize: number;
        search?: string;
    }): Promise<{
        data: User[];
        total: number;
    }>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: any): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
    changePassword(id: number, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
}
