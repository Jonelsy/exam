export declare class CreateClassDto {
    className: string;
    teacherId: number;
}
export declare class getClassDto {
    page: number;
    pageSize: number;
    search: string | null;
}
export declare class UpdateClassDto {
    className: string;
}
export declare class UserClassDto {
    username: string;
    password: string;
    name: string;
    openid: string | null;
    teacherId: number | null;
    classId: number | null;
}
