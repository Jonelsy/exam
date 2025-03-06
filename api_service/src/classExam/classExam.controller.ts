import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ClassExamService } from "./classExam.service";
import { CreateClassExamDto, PaginationDto } from "./dto/create-classExam.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("班级考试管理")
@Controller("class-exam")
export class ClassExamController {
  constructor(private readonly classExamService: ClassExamService) {}

  /**
   * 创建班级考试关联
   * @param createClassExamDto 班级考试信息
   * @returns 创建结果
   */
  @Post()
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "创建班级考试关联" })
  @ApiResponse({ status: 201, description: "创建成功" })
  @ApiResponse({ status: 400, description: "创建失败" })
  create(@Body() createClassExamDto: CreateClassExamDto) {
    return this.classExamService.create(createClassExamDto);
  }

  /**
   * 获取班级考试列表
   * @param paginationDto 分页参数
   * @returns 班级考试列表
   */
  @Get()
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "获取班级考试列表" })
  @ApiResponse({ status: 200, description: "成功" })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.classExamService.findAll(paginationDto);
  }

  /**
   * 删除班级考试关联
   * @param id 关联ID
   * @returns 删除结果
   */
  @Delete(":id")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "删除班级考试关联" })
  @ApiResponse({ status: 200, description: "删除成功" })
  remove(@Param("id") id: string) {
    return this.classExamService.remove(+id);
  }
}
