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
exports.ClassExamController = void 0;
const common_1 = require("@nestjs/common");
const classExam_service_1 = require("./classExam.service");
const create_classExam_dto_1 = require("./dto/create-classExam.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let ClassExamController = class ClassExamController {
    constructor(classExamService) {
        this.classExamService = classExamService;
    }
    create(createClassExamDto) {
        return this.classExamService.create(createClassExamDto);
    }
    findAll(paginationDto) {
        return this.classExamService.findAll(paginationDto);
    }
    remove(id) {
        return this.classExamService.remove(+id);
    }
};
exports.ClassExamController = ClassExamController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "创建班级考试关联" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "创建成功" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "创建失败" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_classExam_dto_1.CreateClassExamDto]),
    __metadata("design:returntype", void 0)
], ClassExamController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "获取班级考试列表" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "成功" }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_classExam_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ClassExamController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "删除班级考试关联" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "删除成功" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassExamController.prototype, "remove", null);
exports.ClassExamController = ClassExamController = __decorate([
    (0, swagger_1.ApiTags)("班级考试管理"),
    (0, common_1.Controller)("class-exam"),
    __metadata("design:paramtypes", [classExam_service_1.ClassExamService])
], ClassExamController);
//# sourceMappingURL=classExam.controller.js.map