import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateClassDto {
  @ApiProperty({ description: "班级名称", example: "计科三班" })
  @IsNotEmpty({ message: "班级名称不能为空" })
  @IsString()
  className: string;

  @ApiProperty({ description: "所属老师", example: 1 })
  @IsNotEmpty({ message: "所属老师不能为空" })
  @IsString()
  teacherId: number;
}

export class UpdateClassDto {
  @ApiProperty({ description: "班级名称", example: "计科三班" })
  @IsNotEmpty({ message: "班级名称不能为空" })
  @IsString()
  className: string;
}
