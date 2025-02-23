export declare class CreateExamDto {
    examName: string;
    description: string;
    startTime: Date;
    endTime: Date;
    duration: number;
    totalScore: number;
    isLimit: boolean;
    allowTimes: number;
    teacherId: number;
}
export declare class UpdateExamDto extends CreateExamDto {
    examId: number;
}
export declare class findExamDto {
    teacherId?: number;
    classId?: number;
    page: number;
    pageSize: number;
    search?: string;
}
