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
import { CreateExamRecordDto } from "./dto/exam-record.dto";
import { ExamService } from "./exam.service";
import { CreateExamDto, findExamDto, UpdateExamDto } from "./dto/exam.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateQuestionDto, UpdateQuestionDto } from "./dto/question.dto";
import { CreateOptionDto, UpdateOptionDto } from "./dto/option.dto";

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
  @Post("/update")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "更新考试信息" })
  @ApiResponse({ status: 200, description: "成功" })
  update(@Body() updateExamDto: UpdateExamDto) {
    return this.examService.update(updateExamDto);
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

  /**
   * 创建题目
   * @param examId 考试ID
   * @param createQuestionDto 题目信息
   * @returns 创建的题目
   */
  @Post("/question")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "创建题目" })
  @ApiBody({ type: CreateQuestionDto })
  @ApiResponse({ status: 201, description: "创建成功" })
  @ApiResponse({ status: 400, description: "创建失败" })
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.examService.createQuestion(createQuestionDto);
  }

  /**
   * 获取某个考试的所有题目
   * @param examId 考试ID
   * @returns 题目列表
   */
  @Get("/question/:examId/:Page/:PageSize")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "获取考试的所有题目" })
  @ApiResponse({ status: 200, description: "成功" })
  getQuestionsByExam(
    @Param("examId") examId: string,
    @Param("Page") Page: number,
    @Param("PageSize") PageSize: number,
  ) {
    return this.examService.findAllQuestions(+examId, +Page, +PageSize);
  }

  /**
   * 获取单个题目
   * @param id 题目ID
   * @returns 题目信息
   */
  @Get("/question/:id")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "获取单个题目信息" })
  @ApiResponse({ status: 200, description: "成功" })
  getQuestion(@Param("id") id: string) {
    return this.examService.findOneQuestion(+id);
  }

  /**
   * 更新题目
   * @param id 题目ID
   * @param updateQuestionDto 更新信息
   * @returns 更新后的题目
   */
  @Patch("/question/:id")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "更新题目信息" })
  @ApiResponse({ status: 200, description: "成功" })
  updateQuestion(
    @Param("id") id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.examService.updateQuestion(+id, updateQuestionDto);
  }

  /**
   * 删除题目
   * @param id 题目ID
   * @returns 删除结果
   */
  @Delete("/question/:id")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "清空题目与答案" })
  @ApiResponse({ status: 200, description: "成功" })
  deleteQuestion(@Param("id") id: number) {
    return this.examService.removeQuestionOptions(+id);
  }

  /**
   * 创建选项
   * @param createOptionDto 选项信息
   * @returns 创建的选项
   */
  @Post("/option")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "创建选项" })
  @ApiBody({ type: CreateOptionDto })
  @ApiResponse({ status: 201, description: "创建成功" })
  @ApiResponse({ status: 400, description: "创建失败" })
  createOption(@Body() createOptionDto: CreateOptionDto) {
    return this.examService.createOption(createOptionDto);
  }

  /**
   * 获取单个选项
   * @param id 选项ID
   * @returns 选项信息
   */
  @Get("/option/:id")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "获取单个选项信息" })
  @ApiResponse({ status: 200, description: "成功" })
  getOption(@Param("id") id: string) {
    return this.examService.getOptionById(+id);
  }

  /**
   * 更新选项
   * @param id 选项ID
   * @param updateOptionDto 更新信息
   * @returns 更新后的选项
   */
  @Patch("/option/:id")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "更新选项信息" })
  @ApiResponse({ status: 200, description: "成功" })
  updateOption(
    @Param("id") id: string,
    @Body() updateOptionDto: UpdateOptionDto,
  ) {
    return this.examService.updateOption(+id, updateOptionDto);
  }

  /**
   * 删除选项
   * @param id 选项ID
   * @returns 删除结果
   */
  @Delete("/option/:id")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "删除选项" })
  @ApiResponse({ status: 200, description: "成功" })
  deleteOption(@Param("id") id: string) {
    return this.examService.deleteOption(+id);
  }

  /**
   * 创建考试记录
   * @param createExamRecordDto 考试记录信息
   * @returns 创建的考试记录
   */
  @Post("/record")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "创建考试记录" })
  @ApiBody({ type: CreateExamRecordDto })
  @ApiResponse({ status: 201, description: "创建成功" })
  @ApiResponse({ status: 400, description: "创建失败" })
  createExamRecord(@Body() createExamRecordDto: CreateExamRecordDto) {
    return this.examService.createExamRecord(createExamRecordDto);
  }
}
