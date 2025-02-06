import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from "@nestjs/common";
import { ClassService } from "./class.service";
import { CreateClassDto, UpdateClassDto, UserClassDto } from "./dto/class.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
@ApiTags("班级相关管理")
@Controller("class")
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  /**
   * 创建班级
   * @param createClassDto 班级信息
   * @returns 创建的班级
   */
  @Post("/class/createClass")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "创建班级" })
  @ApiBody({ type: CreateClassDto })
  @ApiResponse({ status: 201, description: "创建成功" })
  @ApiResponse({ status: 400, description: "创建失败" })
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  /**
   * 获取所有班级
   * @returns 班级列表
   */
  @Get("/class/getClass")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "获取班级列表" })
  @ApiResponse({ status: 201, description: "成功" })
  findAll() {
    return this.classService.findAll();
  }

  /**
   * 获取单个班级
   * @param id 班级ID
   * @returns 班级信息
   */
  @Get(":id")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "获取单个班级信息" })
  @ApiResponse({ status: 201, description: "成功" })
  findOne(@Param("id") id: string) {
    return this.classService.findOne(+id);
  }

  /**
   * 更新班级
   * @param id 班级ID
   * @param updateClassDto 更新信息
   * @returns 更新后的班级
   */
  @Patch(":id")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "更新班级名称" })
  @ApiResponse({ status: 201, description: "成功" })
  update(@Param("id") id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(+id, updateClassDto);
  }

  /**
   * 删除班级
   * @param id 班级ID
   * @returns 删除结果
   */
  @Delete("/deleteClass:id")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "删除班级" })
  @ApiResponse({ status: 201, description: "成功" })
  remove(@Param("id") id: string) {
    return this.classService.delete(+id);
  }

  /**
   * 创建学生与班级的关联
   * @param teacherId 教师ID
   * @param classId 班级ID
   * @param userClassDto 学生信息
   * @returns 创建结果
   */
  @Post("/createStudentClassRelation")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "创建学生与班级的关联" })
  @ApiBody({
    type: UserClassDto,
  })
  @ApiResponse({ status: 201, description: "创建成功" })
  @ApiResponse({ status: 400, description: "创建失败" })
  async createStudentClassRelation(
    @Body("teacherId") teacherId: number,
    @Body("classId") classId: number,
    @Body() userClassDto: UserClassDto,
  ) {
    return this.classService.createStudentClassRelation(
      teacherId,
      classId,
      userClassDto,
    );
  }
}
