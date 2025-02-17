"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamController = void 0;
const common_1 = require("@nestjs/common");
const exam_record_dto_1 = require("./dto/exam-record.dto");
const exam_service_1 = require("./exam.service");
const exam_dto_1 = require("./dto/exam.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const question_dto_1 = require("./dto/question.dto");
const option_dto_1 = require("./dto/option.dto");
let ExamController = class ExamController {
    constructor(examService) {
        this.examService = examService;
    }
    create(createExamDto) {
        return this.examService.create(createExamDto);
    }
    bindExamToClass(examId, classId) {
        return this.examService.bindExamToClass(+examId, +classId);
    }
    findAll(query) {
        return this.examService.findAll(query);
    }
    findOne(id) {
        return this.examService.findOne(+id);
    }
    update(id, updateExamDto) {
        return this.examService.update(+id, updateExamDto);
    }
    remove(id) {
        return this.examService.remove(+id);
    }
    createQuestion(createQuestionDto) {
        return this.examService.createQuestion(createQuestionDto);
    }
    getQuestionsByExam(examId, Page, PageSize) {
        return this.examService.findAllQuestions(+examId, +Page, +PageSize);
    }
    getQuestion(id) {
        return this.examService.findOneQuestion(+id);
    }
    updateQuestion(id, updateQuestionDto) {
        return this.examService.updateQuestion(+id, updateQuestionDto);
    }
    deleteQuestion(id) {
        return this.examService.removeQuestion(+id);
    }
    createOption(createOptionDto) {
        return this.examService.createOption(createOptionDto);
    }
    getOption(id) {
        return this.examService.getOptionById(+id);
    }
    updateOption(id, updateOptionDto) {
        return this.examService.updateOption(+id, updateOptionDto);
    }
    deleteOption(id) {
        return this.examService.deleteOption(+id);
    }
    createExamRecord(createExamRecordDto) {
        return this.examService.createExamRecord(createExamRecordDto);
    }
};
exports.ExamController = ExamController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "创建考试" }),
    (0, swagger_1.ApiBody)({ type: exam_dto_1.CreateExamDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "创建成功" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "创建失败" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_dto_1.CreateExamDto]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(":examId/bind/:classId"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "绑定考试到班级" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "绑定成功" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "绑定失败" }),
    __param(0, (0, common_1.Param)("examId")),
    __param(1, (0, common_1.Param)("classId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "bindExamToClass", null);
__decorate([
    (0, common_1.Get)("/list"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "获取考试列表" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "成功" }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_dto_1.findExamDto]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "获取单个考试信息" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "成功" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "更新考试信息" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "成功" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, exam_dto_1.CreateExamDto]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "删除考试" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "成功" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)("/question"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "创建题目" }),
    (0, swagger_1.ApiBody)({ type: question_dto_1.CreateQuestionDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "创建成功" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "创建失败" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [question_dto_1.CreateQuestionDto]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.Get)("/question/:examId/:Page/:PageSize"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "获取考试的所有题目" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "成功" }),
    __param(0, (0, common_1.Param)("examId")),
    __param(1, (0, common_1.Param)("Page")),
    __param(2, (0, common_1.Param)("PageSize")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "getQuestionsByExam", null);
__decorate([
    (0, common_1.Get)("/question/:id"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "获取单个题目信息" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "成功" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "getQuestion", null);
__decorate([
    (0, common_1.Patch)("/question/:id"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "更新题目信息" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "成功" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, question_dto_1.UpdateQuestionDto]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "updateQuestion", null);
__decorate([
    (0, common_1.Delete)("/question/:id"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "删除题目" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "成功" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "deleteQuestion", null);
__decorate([
    (0, common_1.Post)("/option"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "创建选项" }),
    (0, swagger_1.ApiBody)({ type: option_dto_1.CreateOptionDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "创建成功" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "创建失败" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [option_dto_1.CreateOptionDto]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "createOption", null);
__decorate([
    (0, common_1.Get)("/option/:id"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "获取单个选项信息" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "成功" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "getOption", null);
__decorate([
    (0, common_1.Patch)("/option/:id"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "更新选项信息" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "成功" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, option_dto_1.UpdateOptionDto]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "updateOption", null);
__decorate([
    (0, common_1.Delete)("/option/:id"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "删除选项" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "成功" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "deleteOption", null);
__decorate([
    (0, common_1.Post)("/record"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "创建考试记录" }),
    (0, swagger_1.ApiBody)({ type: exam_record_dto_1.CreateExamRecordDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "创建成功" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "创建失败" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_record_dto_1.CreateExamRecordDto]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "createExamRecord", null);
exports.ExamController = ExamController = __decorate([
    (0, swagger_1.ApiTags)("考试管理"),
    (0, common_1.Controller)("exam"),
    __metadata("design:paramtypes", [exam_service_1.ExamService])
], ExamController);
//# sourceMappingURL=exam.controller.js.map