export declare class RegisterUserDto {
    username: string;
    password: string;
    name: string;
    openid: string;
}
export declare class LoginUserDto {
    username: string;
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
