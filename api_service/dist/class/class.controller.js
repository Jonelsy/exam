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
exports.ClassController = void 0;
const common_1 = require("@nestjs/common");
const class_service_1 = require("./class.service");
const class_dto_1 = require("./dto/class.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let ClassController = class ClassController {
    constructor(classService) {
        this.classService = classService;
    }
    create(createClassDto) {
        return this.classService.create(createClassDto);
    }
    findAll() {
        return this.classService.findAll();
    }
    findOne(id) {
        return this.classService.findOne(+id);
    }
    update(id, updateClassDto) {
        return this.classService.update(+id, updateClassDto);
    }
    remove(id) {
        return this.classService.delete(+id);
    }
    async createStudentClassRelation(teacherId, classId, userClassDto) {
        return this.classService.createStudentClassRelation(teacherId, classId, userClassDto);
    }
};
exports.ClassController = ClassController;
__decorate([
    (0, common_1.Post)("/class/createClass"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "创建班级" }),
    (0, swagger_1.ApiBody)({ type: class_dto_1.CreateClassDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "创建成功" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "创建失败" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [class_dto_1.CreateClassDto]),
    __metadata("design:returntype", void 0)
], ClassController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/class/getClass"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "获取班级列表" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "成功" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClassController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "获取单个班级信息" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "成功" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "更新班级名称" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "成功" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, class_dto_1.UpdateClassDto]),
    __metadata("design:returntype", void 0)
], ClassController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("/deleteClass:id"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "删除班级" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "成功" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)("/createStudentClassRelation"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiOperation)({ summary: "创建学生与班级的关联" }),
    (0, swagger_1.ApiBody)({
        type: class_dto_1.UserClassDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "创建成功" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "创建失败" }),
    __param(0, (0, common_1.Body)("teacherId")),
    __param(1, (0, common_1.Body)("classId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, class_dto_1.UserClassDto]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "createStudentClassRelation", null);
exports.ClassController = ClassController = __decorate([
    (0, swagger_1.ApiTags)("班级相关管理"),
    (0, common_1.Controller)("class"),
    __metadata("design:paramtypes", [class_service_1.ClassService])
], ClassController);
//# sourceMappingURL=class.controller.js.map