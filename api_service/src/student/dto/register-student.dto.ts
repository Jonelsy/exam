import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
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
export class LoginUserDto {
  @ApiProperty({ description: "classId", example: 0 })
  @IsNotEmpty({ message: "classId不能为空" })
  @IsNumber()
  classId: number;

  @ApiProperty({ description: "openid", example: "" })
  @IsString()
  openid?: string;

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
