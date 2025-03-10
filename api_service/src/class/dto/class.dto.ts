import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
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

export class getClassDto {
  @ApiProperty({ description: "页数", example: 1 })
  @IsNotEmpty({ message: "page不能为空" })
  @IsNumber()
  page: number;

  @ApiProperty({ description: "页数", example: 10 })
  @IsNotEmpty({ message: "pageSize不能为空" })
  @IsNumber()
  pageSize: number;

  @ApiProperty({ description: "搜索内容", example: "" })
  @IsString()
  search: string | null;

  @ApiProperty({ description: "老师ID", example: 8 })
  @IsNotEmpty({ message: "老师ID不能为空" })
  @IsNumber()
  teacherId: number;
}

export class UpdateClassDto {
  @ApiProperty({ description: "班级名称", example: "计科三班" })
  @IsNotEmpty({ message: "班级名称不能为空" })
  @IsString()
  className: string;
}

export class UserClassDto {
  @ApiProperty({ description: "用户名", example: "john_doe" })
  @IsNotEmpty({ message: "用户名不能为空" })
  @IsString()
  username: string;

  @ApiProperty({ description: "密码", example: "1234567" })
  @IsNotEmpty({ message: "密码不能为空" })
  @IsString()
  @MinLength(6, { message: "密码长度不能小于6位" })
  password: string;

  @ApiProperty({ description: "姓名", example: "何小雨" })
  @IsNotEmpty({ message: "姓名不能为空" })
  @IsString()
  name: string;

  @ApiProperty({ description: "openid", example: null })
  @IsNotEmpty({ message: "openid学生登陆后补齐" })
  @IsString()
  openid: string | null;

  @ApiProperty({ description: "teacherId", example: 8 })
  @IsNotEmpty({ message: "teacherId不能为空" })
  @IsString()
  teacherId: number | null;

  @ApiProperty({ description: "classId", example: 3 })
  @IsNotEmpty({ message: "classId不能为空" })
  @IsString()
  classId: number | null;
}
