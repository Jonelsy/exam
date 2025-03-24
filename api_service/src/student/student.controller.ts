import { Controller, Post, Body, Get, Delete, UseGuards } from "@nestjs/common";
import { StudentService } from "./student.service";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { getStuExamListDto } from "./dto/register-student.dto";

// import { Roles, ExclusiveRoles } from "../auth/decorators/roles.decorator";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("学生考试相关接口")
@Controller("studnet")
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post("/stuExamList")
  @ApiOperation({ summary: "获取学生下所有考试" })
  @ApiResponse({ status: 201, description: "成功获取列表" })
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  async findAll(@Body() item: getStuExamListDto) {
    return this.studentService.findAllExamList(item);
  }
}
