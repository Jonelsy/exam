import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class getStuExamListDto {
  @ApiProperty({ description: "userId", example: 17 })
  @IsNotEmpty({ message: "userId不能为空" })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: "page", example: 1 })
  @IsNotEmpty({ message: "page不能为空" })
  @IsNumber()
  page: number;

  @ApiProperty({ description: "pageSize", example: 10 })
  @IsNotEmpty({ message: "pageSize不能为空" })
  @IsNumber()
  pageSize: number;
}

export class answersDto {
  @ApiProperty({ description: "选项ID", example: 0 })
  @IsNotEmpty({ message: "选项ID不能为空" })
  @IsNumber()
  optionId: number;

  @ApiProperty({ description: "题目ID", example: 0 })
  @IsNotEmpty({ message: "题目ID不能为空" })
  @IsNumber()
  questionId: number;

  @ApiProperty({ description: "题目类型", example: 0 })
  @IsNumber()
  questionType: number;

  @ApiProperty({ description: "多选题答案", example: [0, 1, 2] })
  optionIds?: Array<number>;

  @ApiProperty({ description: "简答题答案", example: "123" })
  @IsString()
  answer?: string;

  @ApiProperty({ description: "判断题答案", example: 1 })
  @IsString()
  userAnswer?: string;
}
export class subExamDto {
  @ApiProperty({ description: "answers", example: [] })
  answers: answersDto[];

  @ApiProperty({ description: "examId", example: 17 })
  @IsNotEmpty({ message: "examId不能为空" })
  @IsNumber()
  examId: number;

  @ApiProperty({ description: "提交时间" })
  @IsDate()
  submitTime: Date;
}
