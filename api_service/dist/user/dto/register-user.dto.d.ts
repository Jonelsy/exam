export declare class RegisterUserDto {
    username: string;
    password: string;
    name: string;
    openid: string;
    classId: number;
}
export declare class LoginUserDto {
    username: string;
    openid?: string;
    password: string;
}
export declare class UpdateUserDto {
    username: string;
    name: string;
    classId: number | null;
}
export declare class ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
}
export declare class getStudentDto {
    page: number;
    pageSize: number;
    classId: number;
    search?: string;
}
