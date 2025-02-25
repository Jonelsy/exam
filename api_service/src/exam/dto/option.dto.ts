import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateOptionDto {
  @ApiProperty({
    description: "题目ID(questionId)",
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  questionId: number;

  @ApiProperty({
    description: "试题ID(examId)",
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  examId: number;

  @ApiProperty({ description: "选项内容", example: "queryselectAll('p')" })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: "是否正确答案", default: false })
  @IsBoolean()
  isCorrect: boolean;
}

export class UpdateOptionDto {
  @ApiProperty({ description: "选项内容", example: "queryselectAll('p')" })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: "是否正确答案", default: false })
  @IsBoolean()
  isCorrect: boolean;
}

export class OptionResponseDto {
  @ApiProperty({ description: "选项ID" })
  optionId: number;

  @ApiProperty({ description: "题目ID" })
  questionId: number;

  @ApiProperty({ description: "选项内容" })
  content: string;

  @ApiProperty({ description: "是否正确答案" })
  isCorrect: boolean;
}
