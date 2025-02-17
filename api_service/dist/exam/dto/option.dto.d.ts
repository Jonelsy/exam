export declare class CreateOptionDto {
    questionId: number;
    content: string;
    isCorrect: boolean;
}
export declare class UpdateOptionDto {
    content: string;
    isCorrect: boolean;
}
export declare class OptionResponseDto {
    optionId: number;
    questionId: number;
    content: string;
    isCorrect: boolean;
}
