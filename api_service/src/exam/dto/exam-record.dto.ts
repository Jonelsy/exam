import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsDate, IsOptional, IsBoolean } from "class-validator";

export class CreateExamRecordDto {
  @ApiProperty({ description: "用户ID" })
  @IsInt()
  userId: number;

  @ApiProperty({ description: "考试ID" })
  @IsInt()
  examId: number;

  @ApiProperty({ description: "考试成绩", required: false })
  @IsOptional()
  @IsInt()
  score?: number;

  @ApiProperty({ description: "开始时间" })
  @IsDate()
  startTime: Date;

  @ApiProperty({ description: "结束时间" })
  @IsDate()
  endTime: Date;

  @ApiProperty({ description: "是否通过", required: false })
  @IsOptional()
  @IsBoolean()
  isPassed?: boolean;
}
