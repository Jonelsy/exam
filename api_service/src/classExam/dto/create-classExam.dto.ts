import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateClassExamDto {
  @IsNotEmpty()
  @IsNumber()
  classId: number;

  @IsNotEmpty()
  @IsNumber()
  examId: number;
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
}
