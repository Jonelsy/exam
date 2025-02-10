export declare class Exam {
    examId: number;
    examName: string;
    description: string | null;
    startTime: Date;
    endTime: Date;
    duration: number;
    totalScore: number;
    isLimit: boolean;
    allowTimes: number | null;
    createTime: Date | null;
    teacherId: number | null;
}
