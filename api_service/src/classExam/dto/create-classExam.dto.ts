import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateClassExamDto {
  @ApiProperty({ description: "classId", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  classId: number;

  @ApiProperty({ description: "examId", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  examId: number;

  @ApiProperty({ description: "teacherId", example: 8 })
  @IsNotEmpty()
  @IsNumber()
  teacherId: number;
}
export class PaginationDto {
  @ApiProperty({ description: "page", example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: "page不能为空" })
  page: number;

  @ApiProperty({ description: "pageSize", example: 10 })
  @IsNumber()
  @IsNotEmpty({ message: "pageSize不能为空" })
  pageSize: number;

  @ApiProperty({ description: "teacherId", example: 8 })
  @IsNumber()
  @IsNotEmpty({ message: "teacherId不能为空" })
  teacherId: number;
}
