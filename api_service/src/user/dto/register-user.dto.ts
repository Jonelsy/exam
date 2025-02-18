import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class RegisterUserDto {
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

  @ApiProperty({ description: "openid", example: "0" })
  @IsNotEmpty({ message: "openid不能为空" })
  @IsString()
  openid: string;

  @ApiProperty({ description: "classId", example: 0 })
  @IsNotEmpty({ message: "classId不能为空" })
  @IsNumber()
  class_id: number;

  @ApiProperty({ description: "teacherId", example: 8 })
  @IsNotEmpty({ message: "teacherId不能为空" })
  @IsNumber()
  teacherId: number;
}
export class LoginUserDto {
  @ApiProperty({ description: "用户名", example: "john_doe" })
  @IsNotEmpty({ message: "用户名不能为空" })
  @IsString()
  username: string;

  @ApiProperty({ description: "密码", example: "1234567" })
  @IsNotEmpty({ message: "密码不能为空" })
  @IsString()
  @MinLength(6, { message: "密码长度不能小于6位" })
  password: string;
}
export class UpdateUserDto {
  @ApiProperty({ description: "用户名", example: "john_doe" })
  @IsNotEmpty({ message: "用户名不能为空" })
  @IsString()
  username: string;

  @ApiProperty({ description: "姓名", example: "何小雨" })
  @IsNotEmpty({ message: "姓名不能为空" })
  @IsString()
  name: string;

  @ApiProperty({ description: "班级", example: 0 })
  @IsString()
  classId: number | null;
}

export class ChangePasswordDto {
  @ApiProperty({ description: "旧密码", example: "1234567" })
  @IsNotEmpty({ message: "旧密码不能为空" })
  @IsString()
  @MinLength(6, { message: "旧密码长度不能小于6位" })
  oldPassword: string;

  @ApiProperty({ description: "新密码", example: "1234567" })
  @IsNotEmpty({ message: "新密码不能为空" })
  @IsString()
  @MinLength(6, { message: "新密码长度不能小于6位" })
  newPassword: string;
}

export class getStudentDto {
  @ApiProperty({ description: "page", example: 1 })
  @IsNotEmpty({ message: "cpage不能为空" })
  @IsNumber()
  page: number;

  @ApiProperty({ description: "pageSize", example: 10 })
  @IsNotEmpty({ message: "pageSize不能为空" })
  @IsNumber()
  pageSize: number;

  @ApiProperty({ description: "teacherId", example: 8 })
  @IsNotEmpty({ message: "teacherId不能为空" })
  @IsNumber()
  teacherId: number;

  @ApiProperty({ description: "search", example: "" })
  @IsString()
  search?: string;
}
