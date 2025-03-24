export declare class getStuExamListDto {
    userId: number;
    page: number;
    pageSize: number;
}
export declare class LoginUserDto {
    classId: number;
    openid?: string;
    password: string;
}
export declare class UpdateUserDto {
    username: string;
    name: string;
    classId: number | null;
}
