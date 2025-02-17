import { UserService } from "./user.service";
import { RegisterUserDto, LoginUserDto, UpdateUserDto, ChangePasswordDto } from "./dto/register-user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(item: RegisterUserDto): Promise<{
        item: import("../entiy/entities/User.entity").User;
    }>;
    login(item: LoginUserDto): Promise<{
        token: string;
        payload: {
            username: string;
            userId: number;
            role: number;
        };
        code: number;
    }>;
    findAll(): Promise<import("../entiy/entities/User.entity").User[]>;
    findOne(id: string): Promise<import("../entiy/entities/User.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<any>;
    changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getProtectedData(): Promise<{
        message: string;
    }>;
}
