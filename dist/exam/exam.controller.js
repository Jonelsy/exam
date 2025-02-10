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
const exam_service_1 = require("./exam.service");
const exam_dto_1 = require("./dto/exam.dto");
const exam_dto_2 = require("./dto/exam.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
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
    __metadata("design:paramtypes", [exam_dto_2.findExamDto]),
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
exports.ExamController = ExamController = __decorate([
    (0, swagger_1.ApiTags)("考试管理"),
    (0, common_1.Controller)("exam"),
    __metadata("design:paramtypes", [exam_service_1.ExamService])
], ExamController);
//# sourceMappingURL=exam.controller.js.map