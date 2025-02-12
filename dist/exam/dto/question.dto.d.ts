export declare class CreateQuestionDto {
    content: string;
    questionType: number;
    examId: number;
    score: number;
    orderNum: number;
}
export declare class UpdateQuestionDto extends CreateQuestionDto {
}
