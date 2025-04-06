export declare class getStuExamListDto {
    userId: number;
    page: number;
    pageSize: number;
}
export declare class answersDto {
    optionId: number;
    questionId: number;
    questionType: number;
    optionIds?: Array<number>;
    answer?: string;
    userAnswer?: string;
}
export declare class subExamDto {
    answers: answersDto[];
    examId: number;
    submitTime: Date;
}
