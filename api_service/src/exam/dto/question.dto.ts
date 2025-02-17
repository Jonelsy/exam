import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsBoolean, IsNumber } from "class-validator";

export class CreateQuestionDto {
  @ApiProperty({
    description: "题目内容",
    example: "‌JavaScript中，以下哪个方法用于获取页面中所有<p>标签的元素？",
  })
  @IsNotEmpty({ message: "题目不能为空" })
  @IsString()
  content: string;

  @ApiProperty({
    description: "题型（0单选 1多选 2判断 3简答）",
    example: 0,
  })
  @IsNotEmpty({ message: "题型不能为空" })
  @IsBoolean()
  questionType: number;

  @ApiProperty({
    description: "所属考试ID",
    example: 1,
  })
  @IsNotEmpty({ message: "所属考试ID不能为空" })
  @IsNumber()
  examId: number;

  @ApiProperty({
    description: "本题分数",
    example: 10,
  })
  @IsNotEmpty({ message: "分数不能为空" })
  @IsNumber()
  score: number;

  @ApiProperty({
    description: "题目顺序",
    example: 1,
  })
  @IsNotEmpty({ message: "题目顺序不能为空" })
  @IsNumber()
  orderNum: number;
}

export class UpdateQuestionDto extends CreateQuestionDto {}
