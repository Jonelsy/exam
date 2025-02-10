import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { ExamService } from "./exam.service";
import { CreateExamDto } from "./dto/exam.dto";
import { findExamDto } from "./dto/exam.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("考试管理")
@Controller("exam")
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  /**
   * 创建考试
   * @param createExamDto 考试信息
   * @returns 创建的考试
   */
  @Post()
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "创建考试" })
  @ApiBody({ type: CreateExamDto })
  @ApiResponse({ status: 201, description: "创建成功" })
  @ApiResponse({ status: 400, description: "创建失败" })
  create(@Body() createExamDto: CreateExamDto) {
    return this.examService.create(createExamDto);
  }

  /**
   * 绑定考试到班级
   * @param examId 考试ID
   * @param classId 班级ID
   * @returns 绑定结果
   */
  @Post(":examId/bind/:classId")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "绑定考试到班级" })
  @ApiResponse({ status: 201, description: "绑定成功" })
  @ApiResponse({ status: 400, description: "绑定失败" })
  bindExamToClass(
    @Param("examId") examId: string,
    @Param("classId") classId: string,
  ) {
    return this.examService.bindExamToClass(+examId, +classId);
  }

  /**
   * 获取所有考试，分条件，老师能查自己全部、有classId能查classId绑定的全部考试
   * @returns 考试列表
   */
  @Get("/list")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "获取考试列表" })
  @ApiResponse({ status: 200, description: "成功" })
  findAll(@Query() query: findExamDto) {
    return this.examService.findAll(query);
  }

  /**
   * 获取单个考试
   * @param id 考试ID
   * @returns 考试信息
   */
  @Get(":id")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "获取单个考试信息" })
  @ApiResponse({ status: 200, description: "成功" })
  findOne(@Param("id") id: string) {
    return this.examService.findOne(+id);
  }

  /**
   * 更新考试
   * @param id 考试ID
   * @param updateExamDto 更新信息
   * @returns 更新后的考试
   */
  @Patch(":id")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "更新考试信息" })
  @ApiResponse({ status: 200, description: "成功" })
  update(@Param("id") id: string, @Body() updateExamDto: CreateExamDto) {
    return this.examService.update(+id, updateExamDto);
  }

  /**
   * 删除考试
   * @param id 考试ID
   * @returns 删除结果
   */
  @Delete(":id")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "删除考试" })
  @ApiResponse({ status: 200, description: "成功" })
  remove(@Param("id") id: string) {
    return this.examService.remove(+id);
  }
}
