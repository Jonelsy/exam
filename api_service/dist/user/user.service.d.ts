import { Repository } from "typeorm";
import { User } from "../entiy/entities/User.entity";
import { RegisterUserDto } from "./dto/register-user.dto";
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
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
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: any): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
    changePassword(id: number, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
}
