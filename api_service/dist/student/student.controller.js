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
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("./student.service");
const swagger_1 = require("@nestjs/swagger");
const register_student_dto_1 = require("./dto/register-student.dto");
const passport_1 = require("@nestjs/passport");
let StudentController = class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    async findAll(item) {
        return this.studentService.findAllExamList(item);
    }
    async subExamList(item) {
        return this.studentService.subExamList(item);
    }
};
exports.StudentController = StudentController;
__decorate([
    (0, common_1.Post)("/stuExamList"),
    (0, swagger_1.ApiOperation)({ summary: "获取学生下所有考试列表" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "成功获取列表" }),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_student_dto_1.getStuExamListDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("/subExamList"),
    (0, swagger_1.ApiOperation)({ summary: "学生提交考试答案" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "成功提交" }),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_student_dto_1.subExamDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "subExamList", null);
exports.StudentController = StudentController = __decorate([
    (0, swagger_1.ApiTags)("学生考试相关接口"),
    (0, common_1.Controller)("studnet"),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
//# sourceMappingURL=student.controller.js.map