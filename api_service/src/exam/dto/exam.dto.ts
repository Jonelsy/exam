import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateExamDto {
  @ApiProperty({ description: "考试名称", example: "计算机组成原理" })
  @IsString()
  @IsNotEmpty({ message: "考试名称不能为空" })
  examName: string;

  @ApiProperty({
    description: "考试描述",
    example: "探索计算机的奥秘，深入微观世界",
  })
  @IsString()
  description: string;

  @ApiProperty({ description: "开始时间", example: new Date() })
  @IsString()
  @IsNotEmpty({ message: "开始时间不能为空" })
  startTime: Date;

  @ApiProperty({ description: "结束时间", example: new Date() })
  @IsString()
  @IsNotEmpty({ message: "结束时间不能为空" })
  endTime: Date;

  @ApiProperty({ description: "考试时长(分钟)", example: 120 })
  @IsNumber()
  @IsNotEmpty({ message: "考试时长不能为空" })
  duration: number;

  @ApiProperty({ description: "总分", example: 100 })
  @IsNumber()
  @IsNotEmpty({ message: "总分不能为空" })
  totalScore: number;

  @ApiProperty({ description: "是否限制次数", example: 0 })
  @IsNumber()
  @IsNotEmpty({ message: "是否限制次数不能为空" })
  isLimit: boolean;

  @ApiProperty({ description: "允许考试次数", example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: "允许考试次数不能为空" })
  allowTimes: number;

  @ApiProperty({ description: "老师ID", example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: "老师ID不能为空" })
  teacherId: number;
}

export class UpdateExamDto extends CreateExamDto {
  @ApiProperty({ description: "examId", example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: "examId不能为空" })
  examId: number;
}

export class findExamDto {
  @ApiPropertyOptional({ description: "Teacher ID", example: 8 })
  @IsOptional()
  @IsString()
  teacherId?: number;

  @ApiPropertyOptional({ description: "Class ID", example: 3 })
  @IsOptional()
  @IsString()
  classId?: number;

  @ApiProperty({ description: "page", example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: "page不能为空" })
  page: number;

  @ApiProperty({ description: "pageSize", example: 10 })
  @IsNumber()
  @IsNotEmpty({ message: "pageSize不能为空" })
  pageSize: number;

  @ApiProperty({ description: "搜索", example: "计算机组成原理" })
  @IsOptional()
  @IsString()
  search?: string;
}
